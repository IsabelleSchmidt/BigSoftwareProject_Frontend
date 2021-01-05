import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/favorits',
    name: 'Favorits',
    component: () => import('../views/Favorits.vue')
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue')
  }
  ,
  {
    path: '/rooms',
    name: 'Rooms',
    component: () => import('../views/Rooms.vue')
  },
  // {
  //   path: '/product',
  //   name: 'Product',
  //   component: () => import('../views/Product.vue'),
  // }
  // ,
  {
    path: '/product/:room',
    name: 'Product',
    component: () => import('../views/Product.vue'),
    props: true
  },
  {
    path: '/orderForm',
    name: 'OrderForm',
    component: () => import('../views/OrderForm.vue'),
  },
  {
    path: '/orderConf',
    name: 'OrderConf',
    component: () => import('../components/OrderConfirmation.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
