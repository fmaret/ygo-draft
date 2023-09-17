import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: () => import('@/pages/MainPage.vue')
  },
  {
    path: '/deck-editor',
    name: 'DeckEditor',
    component: () => import('@/pages/DeckEditor.vue')
  },
  {
    path: '/cards',
    name: 'CardsPage',
    component: () => import('@/pages/CardsPage.vue')
  },
  {
    path: '/booster',
    name: 'OpenBooster',
    component: () => import('@/pages/OpenBooster.vue')
  },
  {
    path: '/draft',
    name: 'DraftPage',
    component: () => import('@/pages/DraftPage.vue')
  },
  {
    path: '/test',
    name: 'TestPage',
    component: () => import('@/pages/TestPage.vue')
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

