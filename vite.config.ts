import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // ensures production assets load from root
  plugins: [react()],
  css: {
    postcss: {
      plugins: [],
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});