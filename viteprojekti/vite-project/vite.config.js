// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'register.html'),
        home: resolve(__dirname, 'login.html'),
        head: resolve(__dirname, 'app.html')
      },
    },
  },
  base: '/dist/',
}); 