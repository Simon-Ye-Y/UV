import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(scriptDir, '..')
const pagesDir = path.join(rootDir, 'pages')

const linkFileExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs'])
const skipDirs = new Set(['node_modules', '.next', '.git', 'uv-project.webflow'])

function normalizeRouterPath(value) {
  if (!value.startsWith('/')) return null
  if (value.startsWith('//')) return null
  const [base] = value.split(/[#?]/)
  if (!base || base === '') return null
  const trimmed = base.replace(/\/+$/g, '')
  if (trimmed === '') return '/'
  if (!trimmed.startsWith('/')) return null
  const segments = trimmed.split('/').filter(Boolean)
  if (!segments.length) return '/'
  const lastSegment = segments[segments.length - 1]
  if (lastSegment.includes('.')) return null
  return trimmed
}

function escapeRegex(source) {
  return source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildDynamicRegex(routeSegments) {
  if (!routeSegments.length) return /^\/$/
  const pattern = routeSegments
    .map((segment) => {
      if (segment.startsWith('[...') && segment.endsWith(']')) return '.+'
      if (segment.startsWith('[') && segment.endsWith(']')) return '[^/]+'
      return escapeRegex(segment)
    })
    .join('\\/')
  return new RegExp(`^/${pattern}$`)
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
    if (!linkFileExtensions.has(ext)) continue
    bucket.push(fullPath)
  }
  return bucket
}

async function collectPageRoutes() {
  const routes = new Set()
  const dynamicPatterns = []

  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name === 'api' || skipDirs.has(entry.name)) continue
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        await walk(fullPath)
        continue
      }
      const ext = path.extname(entry.name).toLowerCase()
      if (!linkFileExtensions.has(ext)) continue
      const relative = path.relative(pagesDir, fullPath)
      const route = getRouteFromRelative(relative)
      if (!route) continue
      if (route.includes('[')) {
        const regex = buildDynamicRegex(route.split('/').filter(Boolean))
        dynamicPatterns.push({ route, regex })
      } else {
        routes.add(route)
      }
    }
  }

  await walk(pagesDir)
  routes.add('/') // ensure root route included
  return { routes, dynamicPatterns }
}

function getRouteFromRelative(relativePath) {
  const segments = relativePath.split(path.sep)
  const fileName = segments.pop()
  const baseName = path.parse(fileName).name
  if (baseName.startsWith('_')) return null
  const normalizedSegments = segments.map((segment) => path.parse(segment).name)
  if (baseName !== 'index') normalizedSegments.push(baseName)
  const route = '/' + normalizedSegments.filter(Boolean).join('/')
  return route === '' ? '/' : route
}

function getLineNumber(text, index) {
  return text.slice(0, index).split('\n').length
}

async function run() {
  const { routes, dynamicPatterns } = await collectPageRoutes()
  const files = await collectFiles(rootDir)

  const hrefRegex = /href\s*=\s*(?:\{\s*)?['"]([^'"]+)['"]/g
  const linkPropRegex = /link\s*:\s*['"]([^'"]+)['"]/g
  const webflowRegex = /\.webflow\.io/g

  const brokenLinks = []
  const webflowFindings = []

  for (const file of files) {
    const text = await fs.readFile(file, 'utf8')

    const trackMatch = (match, index) => {
      const value = match[1]
      const normalized = normalizeRouterPath(value)
      if (!normalized) return
      if (routes.has(normalized)) return
      if (dynamicPatterns.some((pattern) => pattern.regex.test(normalized))) return
      brokenLinks.push({
        file,
        path: normalized,
        line: getLineNumber(text, index),
      })
    }

    let match
    hrefRegex.lastIndex = 0
    while ((match = hrefRegex.exec(text))) {
      trackMatch(match, match.index)
    }

    linkPropRegex.lastIndex = 0
    while ((match = linkPropRegex.exec(text))) {
      trackMatch(match, match.index)
    }

    webflowRegex.lastIndex = 0
    while ((match = webflowRegex.exec(text))) {
      webflowFindings.push({
        file,
        line: getLineNumber(text, match.index),
      })
    }
  }

  const filteredWebflowFindings = webflowFindings.filter(({ file }) => {
    const rel = path.relative(rootDir, file)
    return !rel.startsWith(`scripts${path.sep}`)
  })

  if (filteredWebflowFindings.length) {
    console.error('Found .webflow.io references that need review:')
    for (const finding of filteredWebflowFindings) {
      console.error(`  ${path.relative(rootDir, finding.file)}:${finding.line}`)
    }
  }

  if (brokenLinks.length) {
    console.error('Broken internal links detected:')
    for (const broken of brokenLinks) {
      console.error(
        `  ${path.relative(rootDir, broken.file)}:${broken.line} → ${broken.path}`
      )
    }
  }

  if (filteredWebflowFindings.length || brokenLinks.length) {
    throw new Error('Link check failed.')
  }

  console.log('Link check passed (no missing routes or .webflow.io targets detected).')
}

run().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
