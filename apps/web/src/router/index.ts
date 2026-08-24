import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

declare module 'vue-router' {
  interface RouteMeta {
    /** 需要登录后才能访问 */
    requiresAuth?: boolean;
    /** 需要持有的权限码（任一满足即可），仅做 UI 展示控制，服务端仍会强制校验 */
    roles?: string[];
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'stats',
          name: 'stats',
          component: () => import('@/views/stats/index.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'wip',
          name: 'wip',
          component: () => import('@/views/wip/index.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    { path: '/login', name: 'login', component: () => import('@/views/login/index.vue') },
  ],
});

let profileLoaded = false;

router.beforeEach(async (to) => {
  const userStore = useUserStore();

  if (!profileLoaded) {
    profileLoaded = true;
    await userStore.fetchProfile();
  }

  // 已登录用户访问登录页时直接回 home
  if (to.name === 'login' && userStore.isLoggedIn) {
    return { name: 'home' };
  }

  // 未登录跳转登录页，并记录来源页面以便重新登录后返回
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  const requiredRoles = to.meta.roles;
  if (requiredRoles?.length && !requiredRoles.some((role) => userStore.permissionList.includes(role))) {
    return { name: 'home' };
  }

  return true;
});

export default router;
