import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://vent-hyfi.onrender.com',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()]
})
