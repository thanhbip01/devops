import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',           // ← DÒNG NÀY QUAN TRỌNG NHẤT TRÊN RAILWAY!!!
})