<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useThemeStore } from '@/stores/theme';

interface NavItem {
  /** 路由路径，同时作为 el-menu 的 index */
  path: string;
  /** 展示名（中文） */
  label: string;
  /** 英文代号 */
  en: string;
  /** 需要持有的权限码（任一满足即可），为空表示不限制 */
  roles?: string[];
}

const route = useRoute();
const userStore = useUserStore();
const themeStore = useThemeStore();

/** 导航项（三大模块），按用户权限过滤（由 home 页面统一处理权限展示控制） */
const navItems = computed<NavItem[]>(() => {
  const items: NavItem[] = [
    { path: '/my', label: '我的堆积', en: 'My' },
    { path: '/database', label: '资料库', en: 'DataBase' },
    { path: '/model-magic', label: '模法', en: 'ModelMagic' },
  ];
  return items.filter(
    (item) => !item.roles?.length || item.roles.some((role) => userStore.permissionList.includes(role)),
  );
});

/** el-menu 开启 router 模式后按 index 跳转，主导航按一级路径匹配激活项（模块内子路由如 /my/my-stack 归属 /my） */
const activePath = computed(() => `/${route.path.split('/')[1] || ''}`);

/** 移动端抽屉导航展开状态 */
const drawerVisible = ref(false);

watch(
  () => route.fullPath,
  () => {
    drawerVisible.value = false;
  },
);
</script>

<template>
  <div class="page-shell">
    <header class="page-header">
      <div class="header-main">
        <el-button
          class="nav-toggle"
          size="small"
          @click="drawerVisible = true"
        >导航</el-button>
        <h1 class="page-title">湖中坦克的智慧</h1>
      </div>
      <el-button
        class="theme-toggle"
        size="small"
        @click="themeStore.toggle()"
      >{{ themeStore.isDark ? '昼间模式' : '夜间模式' }}</el-button>
    </header>

    <div class="page-body">
      <aside class="page-sidebar">
        <el-menu class="page-nav" router :default-active="activePath">
          <el-menu-item v-for="item in navItems" :key="item.path" :index="item.path">
            <span class="nav-label">{{ item.label }}</span>
            <span class="nav-en">{{ item.en }}</span>
          </el-menu-item>
        </el-menu>
      </aside>

      <main class="page-main">
        <router-view />
      </main>
    </div>

    <el-drawer
      v-model="drawerVisible"
      class="mobile-nav-drawer"
      direction="ltr"
      size="200px"
      :with-header="false"
    >
      <el-menu
        class="drawer-nav"
        router
        :default-active="activePath"
        @select="drawerVisible = false"
      >
        <el-menu-item v-for="item in navItems" :key="item.path" :index="item.path">
          <span class="nav-label">{{ item.label }}</span>
          <span class="nav-en">{{ item.en }}</span>
        </el-menu-item>
      </el-menu>
    </el-drawer>
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

.header-main {
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-title {
  font-size: 18px;
}

.theme-toggle {
  font-weight: 400;
}

.page-body {
  display: flex;
  flex: 1;
  align-items: stretch;
}

/* 移动端默认隐藏左侧导航，仅通过抽屉展示 */
.page-sidebar {
  display: none;
}

.drawer-nav {
  width: 100%;
  border-right: none;
}

.nav-en {
  margin-left: 6px;
  color: var(--app-text-secondary, #888);
  font-size: 12px;
}

.page-main {
  flex: 1;
  min-width: 0;
  padding: 12px;
}

/* PC 端常驻左侧导航栏 */
@media (min-width: 768px) {
  .page-shell {
    max-width: 960px;
  }

  .nav-toggle {
    display: none;
  }

  .page-sidebar {
    display: block;
    flex-shrink: 0;
    width: 160px;
    background: var(--app-surface-color, #fff);
    border-right: 1px solid var(--el-border-color-light, #eee);
  }

  .page-nav {
    border-right: none;
  }

  .page-main {
    padding: 20px 24px;
  }
}
</style>

<style>
.mobile-nav-drawer .el-drawer__body {
  padding: 0;
}
</style>
