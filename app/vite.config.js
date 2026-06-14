import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const designRoot = path.resolve(__dirname, '../design')

function serveDesignFolder() {
  return {
    name: 'serve-design-folder',
    configureServer(server) {
      server.middlewares.use('/design', (req, res, next) => {
        let urlPath = req.url?.split('?')[0] || '/'
        if (urlPath === '/') urlPath = '/index.html'

        const filePath = path.join(designRoot, urlPath)
        if (!filePath.startsWith(designRoot) || !fs.existsSync(filePath)) {
          next()
          return
        }

        const types = {
          '.html': 'text/html',
          '.css': 'text/css',
          '.js': 'application/javascript',
        }
        const ext = path.extname(filePath)
        res.setHeader('Content-Type', types[ext] || 'application/octet-stream')
        fs.createReadStream(filePath).pipe(res)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), serveDesignFolder()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@data': path.resolve(__dirname, '../data'),
    },
  },
})
