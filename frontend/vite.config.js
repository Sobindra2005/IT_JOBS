// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer';

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss() ,
        autoprefixer()
      ],
    },
  }
});
