import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/ 
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://news-hub-602j.onrender.com', // your Express backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})