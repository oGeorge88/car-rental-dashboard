
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


// Professional Vite config for React project
// See: https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Deploy to root
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@components': new URL('./src/components', import.meta.url).pathname,
      '@assets': new URL('./src/assets', import.meta.url).pathname,
      '@data': new URL('./src/data', import.meta.url).pathname,
      '@styles': new URL('./src/styles', import.meta.url).pathname,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Enable source maps for debugging
    emptyOutDir: true, // Clean output dir before build
  },
  server: {
    port: 5173,
    open: true, // Open browser on dev start
  },
  // Future: Add environment variables, proxy, etc.
});
