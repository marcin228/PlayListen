import { defineConfig as defineViteConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const viteConfig = defineViteConfig({
  plugins: [react()],
})

// https://vitejs.dev/config/
export default defineVitestConfig({
  ...viteConfig,
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ["text", "html"],
    },
  }
})
