import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        development: 'development/index.html',
        steamAuthConnectionGrants: 'development/steam-auth-connection-grants/index.html',
      },
    },
  },
})
