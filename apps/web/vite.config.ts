import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // @model-stacker/data 产物为 CommonJS，dev 下浏览器按 ESM 导入会缺少命名导出，
      // 直接指向源码以 ESM 形式编译加载
      '@model-stacker/data': fileURLToPath(new URL('../../packages/data/src/index.ts', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
