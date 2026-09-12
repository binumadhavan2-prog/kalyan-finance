import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages project page: the site is served under /<repo>/, so the built
  // asset URLs need that prefix. For a custom domain or a user page served at
  // the domain root, set this back to '/'.
  base: '/kalyan-finance/',
  plugins: [react()],
})
