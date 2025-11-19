import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // ĐẢM BẢO KHÔNG CÓ DÒNG root: "frontend" hay root: bất cứ gì
  // Nếu có thì xóa bỏ hoàn toàn
  build: {
    outDir: 'dist',  // mặc định rồi, giữ lại cho chắc
    emptyOutDir: true
  }
})