import '../public/css/normalize.css'
import '../public/css/webflow.css'
import '../public/css/uv-project.webflow.css'
import '../public/css/services.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // 这里可以添加全局的副作用，比如：
    // 1. 分析工具初始化
    // 2. 主题设置
    // 3. 用户认证状态检查
    // 4. 全局事件监听
  }, [])

  return (
    <main>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
