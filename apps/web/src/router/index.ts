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
      redirect: { name: 'my' },
      meta: { requiresAuth: true },
      children: [
        {
          // 我的堆积（My）：统计、管理用户的堆积
          // 子模块：个人主页（默认）/ 我的堆积列表 / 详细统计
          path: 'my',
          component: () => import('@/views/my/layout.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: '',
              name: 'my',
              component: () => import('@/views/my/index.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'my-stack',
              name: 'my-stack',
              component: () => import('@/views/my/my-stack/index.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'statistics',
              name: 'my-statistics',
              component: () => import('@/views/my/statistics/index.vue'),
              meta: { requiresAuth: true },
            },
          ],
        },
        {
          // 资料库（DataBase）：检索品牌、产品、产品价格等内容
          path: 'database',
          name: 'database',
          component: () => import('@/views/database/index.vue'),
          meta: { requiresAuth: true },
        },
        {
          // 模法（ModelMagic）：模型制作的技巧等文章
          path: 'model-magic',
          name: 'model-magic',
          component: () => import('@/views/model-magic/index.vue'),
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
