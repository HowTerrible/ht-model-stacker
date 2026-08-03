import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'dashboard', component: () => import('@/views/dashboard/index.vue') },
    { path: '/product', name: 'product', component: () => import('@/views/product/index.vue') },
    {
      path: '/manufacturer',
      name: 'manufacturer',
      component: () => import('@/views/manufacturer/index.vue'),
    },
    { path: '/price', name: 'price', component: () => import('@/views/price/index.vue') },
  ],
});

export default router;
