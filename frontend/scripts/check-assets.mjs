import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(scriptDir, '..')
const publicDir = path.join(rootDir, 'public')

const allowedExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.css'])
const skipDirs = new Set(['node_modules', '.next', '.git', 'uv-project.webflow'])

const assetAttrRegex = /(?:src|href|data-src|data-href)\s*=\s*(?:\{\s*)?['"]([^'"]+\.[a-zA-Z0-9]+?)['"]/g
const urlRegex = /url\(\s*(?:['"])?(\/[^'")]+)(?:['"])?\s*\)/g

function normalizeAssetPath(rawPath) {
  const cleaned = rawPath.split(/[?#]/)[0]
  if (!cleaned.startsWith('/')) return null
  if (cleaned.startsWith('//')) return null
  return cleaned.replace(/\/+/g, '/')
}

async function collectFiles(dir, bucket = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (skipDirs.has(entry.name)) continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await collectFiles(fullPath, bucket)
      continue
    }
    const ext = path.extname(entry.name).toLowerCase()
    if (!allowedExtensions.has(ext)) continue
    bucket.push(fullPath)
  }
  return bucket
}

function getLineNumber(text, index) {
  return text.slice(0, index).split('\n').length
}

async function run() {
  const files = await collectFiles(rootDir)
  const references = []

  for (const file of files) {
    const text = await fs.readFile(file, 'utf8')
    const extract = (regex) => {
      regex.lastIndex = 0
      let match
      while ((match = regex.exec(text))) {
        const pathValue = normalizeAssetPath(match[1])
        if (!pathValue) continue
        const line = getLineNumber(text, match.index)
        references.push({
          path: pathValue,
          file,
          line,
        })
      }
    }

    extract(assetAttrRegex)
    extract(urlRegex)
  }

  const missing = []
  const seen = new Set()

  for (const { path: assetPath, file, line } of references) {
    if (seen.has(`${assetPath}|${file}|${line}`)) continue
    seen.add(`${assetPath}|${file}|${line}`)
    const target = path.join(publicDir, assetPath.slice(1))
    try {
      await fs.access(target)
    } catch {
      missing.push({ assetPath, file, line })
    }
  }

  if (missing.length) {
    console.error('Asset check failed. Missing public assets:')
    for (const { assetPath, file, line } of missing) {
      console.error(`  ${assetPath} referenced from ${path.relative(rootDir, file)}:${line}`)
    }
    throw new Error('Some referenced assets are missing from public/')
  }

  console.log(`Asset check passed (${references.length} references scanned).`)
}

run().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
