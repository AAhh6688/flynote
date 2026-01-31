import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 开发环境代理后端接口（部署后替换为后端实际地址）
      '/api': {
        target: 'http://localhost:3000', // 后端Docker地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist', // 打包输出目录（Cloudflare Pages需要）
    assetsDir: 'assets'
  }
})