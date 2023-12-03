import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import progress from 'vite-plugin-progress';

import mobileToBase from './buildCallback.js';

const BASE_URL = '/base';

export default defineConfig({
  plugins: [
    react(),
    progress({
      format: 'building [:bar] :percent',

      complete: '█',

      callback: () => {
        console.log(BASE_URL);
        const files = mobileToBase('./dist', BASE_URL);
        console.log(files);
      },
    }),
  ],
  base: BASE_URL,
  resolve: {
    alias: {
      '@': path.resolve('./src'), // @代替src
    },
  },
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
        manualChunks: {
          // 将 React 相关库打包成单独的 chunk 中
          'react-vendor': ['react', 'react-dom'],
          // 将组件库的代码打包
          library: ['antd', 'dayjs'],
        },
      },
    },
    terserOptions: {
      compress: {
        pure_funcs: ['console.log'], // 只删除 console.log
        drop_debugger: true, // 删除 debugger
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]_[hash:base64:2]',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.vvhan.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    port: 8138,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    host: true,
    open: true,
  },
});
