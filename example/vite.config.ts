import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  build: {
    rollupOptions: {
      external: ['slate', 'slate-react', 'slate-history']
    }
  }
})