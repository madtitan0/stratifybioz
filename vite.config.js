import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from /stratifybioz/ — this keeps asset paths correct.
  // For local dev, Vite still works; just open http://localhost:5173/stratifybioz/
  base: process.env.NODE_ENV === 'production' ? '/stratifybioz/' : '/',
})
