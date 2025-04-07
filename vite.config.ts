import { defineConfig } from 'vite'
import { resolve } from 'path'
import fs from 'fs/promises'
import path from 'path'
import { minify as minifyHtml } from 'html-minifier'
import postcss from 'postcss'
import cssnano from 'cssnano'

function compressStaticAssets() {
  return {
    name: 'compress-static-assets',
    async writeBundle(options) {
      const outDir = options.dir || resolve(__dirname, 'dist')

      async function walkDir(dir: string) {
        const entries = await fs.readdir(dir, { withFileTypes: true })
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            await walkDir(fullPath)
          } else if (['.html', '.css', '.json'].includes(path.extname(entry.name))) {
            await processFile(fullPath)
          }
        }
      }

      async function processFile(filePath: string) {
        try {
          const ext = path.extname(filePath)
          const content = await fs.readFile(filePath, 'utf-8')
          let minifiedContent = content
          if (ext === '.html') {
            minifiedContent = minifyHtml(content, {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              minifyCSS: true,
              minifyJS: true,
            })
          } else if (ext === '.css') {
            const result = await postcss([cssnano]).process(content, { from: undefined })
            minifiedContent = result.css
          } else if (ext === '.json') {
            minifiedContent = JSON.stringify(JSON.parse(content))
          }
          await fs.writeFile(filePath, minifiedContent, 'utf-8')
          console.log(`Compressed: ${filePath}`)
        } catch (error) {
          console.error(`Error compressing ${filePath}:`, error)
        }
      }
      await walkDir(outDir)
    }
  }
}

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        autoload: resolve(__dirname, 'src/autoload.js'),
        'waifu-tips': resolve(__dirname, 'src/waifu-tips.js'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  plugins: [
    compressStaticAssets()
  ]
})
