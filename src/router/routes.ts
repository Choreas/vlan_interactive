import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'step2', component: () => import('pages/Step2.vue') },
      { path: 'pkindex', component: () => import('pages/OuG/Prozesskostenrechnung-Index.vue') },
      { path: 'kzindex', component: () => import('pages/OuG/Kennzahlen-Index.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
