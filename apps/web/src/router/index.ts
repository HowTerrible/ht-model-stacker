import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/home/index.vue') },
    { path: '/stats', name: 'stats', component: () => import('@/views/stats/index.vue') },
    { path: '/wip', name: 'wip', component: () => import('@/views/wip/index.vue') },
  ],
});

export default router;
