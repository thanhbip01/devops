import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'frontend',           // ← chỉ Vite lấy index.html từ thư mục frontend
  build: {
    outDir: 'dist'
  },
  plugins: [react()]
})