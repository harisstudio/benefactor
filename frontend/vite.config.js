
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about-benefactor.html'),
        careers: resolve(__dirname, 'careers.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        donate: resolve(__dirname, 'donate.html'),
        how: resolve(__dirname, 'how-benefactor-works.html'),
        signin: resolve(__dirname, 'signin.html'),
        start: resolve(__dirname, 'start.html'),
      },
    },
  },
})
