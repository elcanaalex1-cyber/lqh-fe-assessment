import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
    // This repository may be installed with npm or pnpm. Force all linked
    // dependencies to share the app's React instance in development.
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: { include: ['react', 'react-dom', 'react-dom/client'] },
})
