<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { StackStatus } from '@model-stacker/data';
import { useUserStore } from '@/stores/user';
import { useThemeStore } from '@/stores/theme';

interface NavItem {
  /** 路由路径，同时作为 el-menu 的 index */
  path: string;
  label: string;
  /** 需要持有的权限码（任一满足即可），为空表示不限制 */
  roles?: string[];
}

const route = useRoute();
const userStore = useUserStore();
const themeStore = useThemeStore();

/** 底部导航项，按用户权限过滤（由 home 页面统一处理权限展示控制） */
const navItems = computed<NavItem[]>(() => {
  const items: NavItem[] = [
    { path: '/', label: '堆积' },
    { path: '/stats', label: '花销' },
    { path: '/wip', label: '烂尾' },
  ];
  return items.filter(
    (item) => !item.roles?.length || item.roles.some((role) => userStore.permissionList.includes(role)),
  );
});

/** 是否处于默认内容（/）而非子页面 */
const isDefaultView = computed(() => route.name === 'home');

/** el-menu 开启 router 模式后按 index 跳转，当前路由即激活项 */
const activePath = computed(() => route.path);

const statuses = Object.values(StackStatus);
</script>

<template>
  <div class="page-shell">
    <header class="page-header">
      <h1 class="page-title">ModelStacker</h1>
      <el-button
        class="theme-toggle"
        size="small"
        @click="themeStore.toggle()"
      >{{ themeStore.isDark ? '昼间模式' : '夜间模式' }}</el-button>
    </header>

    <main class="page-main">
      <template v-if="isDefaultView">
        <section class="page">
          <h2>我的堆积</h2>
          <p class="tip">堆积列表功能开发中，可查看自己购买的产品、按时间/状态筛选。</p>
          <ul class="list">
            <li v-for="s in statuses" :key="s" class="item">
              <span class="label">堆积状态</span>
              <code>{{ s }}</code>
            </li>
          </ul>
        </section>
      </template>

      <!-- 子页面（stats / wip）由嵌套路由渲染 -->
      <router-view v-else />
    </main>

    <el-menu
      class="page-nav"
      mode="horizontal"
      router
      :default-active="activePath"
      :ellipsis="false"
    >
      <el-menu-item v-for="item in navItems" :key="item.path" :index="item.path">
        {{ item.label }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.page-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 640px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--app-surface-color, #fff);
  border-bottom: 1px solid var(--el-border-color-light, #eee);
}

.page-title {
  font-size: 18px;
}

.theme-toggle {
  font-weight: 400;
}

.page-main {
  flex: 1;
  padding: 12px;
}

/* 底部导航：横向 el-menu 平铺为底部标签栏 */
.page-nav {
  border-top: 1px solid var(--el-border-color-light, #eee);
  border-bottom: none;
}

.page-nav :deep(.el-menu-item) {
  flex: 1;
  justify-content: center;
  height: 48px;
  line-height: 48px;
}

.page-nav :deep(.el-menu-item.is-active) {
  border-bottom: none;
  font-weight: 600;
}

.page h2 {
  margin-bottom: 8px;
}

.tip {
  margin-bottom: 12px;
  color: var(--app-text-secondary, #888);
  font-size: 13px;
}

.list {
  list-style: none;
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 8px;
  background: var(--app-surface-color, #fff);
  border-radius: 8px;
  font-size: 14px;
}

.label {
  color: var(--app-text-secondary, #888);
}
</style>
