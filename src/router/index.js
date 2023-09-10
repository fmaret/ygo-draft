import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: () => import('@/pages/MainPage.vue')
  },
  {
    path: '/card',
    name: 'CardViewer',
    component: () => import('@/components/CardViewer.vue')
  },
  {
    path: '/deck-editor',
    name: 'DeckEditor',
    component: () => import('@/pages/DeckEditor.vue')
  },
  {
    path: '/booster',
    name: 'OpenBooster',
    component: () => import('@/pages/OpenBooster.vue')
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

