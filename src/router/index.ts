import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { useEmailStore } from '../service/EmailStore'

const { code, getCode } = useEmailStore();
const history = createWebHistory();

const router = createRouter({
  history,
   routes: 
   [
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
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/Profile.vue')
    }
    ,
    {
      path: '/rooms',
      name: 'Rooms',
      component: () => import('../views/Rooms.vue')
    },
    {
      path: '/product',
      name: 'Product',
      component: () => import('../views/Product.vue'),
      props: true
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/profile/login',
      name: 'PLogin',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/cart/login',
      name: 'CLogin',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/logout',
      name: 'Logout',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/orderform',
      name: 'OrderForm',
      component: () => import('../views/OrderForm.vue')
    },
    
    { 
    path: '/404', 
    component: () => import('../components/NotFound.vue') 
    },
    {
      path: '/:catchAll(.*)', redirect:'404'
    },
    {
      path: '/orderConf',
      name: 'OrderConf',
      component: () => import('../components/OrderConfirmation.vue'),
    },
    {
      path: '/resetPassword/:email/:code',
      name: 'ResetPassword',
      component: () => import('../views/ResetPassword.vue'),
      props: true,
    }
  ]
});

export default router;
