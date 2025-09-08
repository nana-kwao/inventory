import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy :{
      "/api": {
        target: "https://inventory-server-tmqz.onrender.com:10000",
        changeOrigin: true,
        secure: false,
      }
    }
  }
build: {
    outDir: 'dist',
    // Generate index.html for all routes
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
})
