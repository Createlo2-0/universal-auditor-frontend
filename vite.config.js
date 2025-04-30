import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/universal-auditor-frontend/',
  server: {
    port: 3000, // Change the port to 3000
    open: true,
    historyApiFallback: true,
  },
})
