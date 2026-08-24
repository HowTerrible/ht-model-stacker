<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
// 应用启动时应用持久化主题的 token（写入 :root）
themeStore.init();
</script>

<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

/* 暗色主题下让原生滚动条 / 表单控件跟随深色渲染 */
html.app-theme-dark {
  color-scheme: dark;
}

body {
  font-family: system-ui, -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: var(--app-page-bg, #f5f6f8);
  color: var(--app-text-color, #333);
}
</style>
