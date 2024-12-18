import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'accounts-view',
      component: () => import('../views/AccountsView.vue'),
    },
  ],
})

export default router
