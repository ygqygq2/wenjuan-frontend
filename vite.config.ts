import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  build: {
    // manifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd'],
        },
        // just a hack to get the next path segment of the last node_modules in path
        // manualChunks: (path) => path.split ('/').reverse()[path.split ('/').reverse().indexOf ('node_modules') - 1],
      },
    },
  },
});
