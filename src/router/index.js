import { createRouter, createWebHistory } from 'vue-router'
import clientePage from '../views/clientePage.vue'
import HomeView from '../views/HomeView.vue'
import comprasPage from '../views/comprasPage.vue'
/* eslint-disable */ 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView, 
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: clientePage, 
  },
  {
    path: '/compras',
    name: 'Compras',
    component: comprasPage, 
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
