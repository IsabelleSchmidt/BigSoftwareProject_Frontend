import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
/**
 * HTML5 history
 */
const history = createWebHistory();
/**
 * creates a router and sets possible routes
 */
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
      component: () => import('../views/About.vue')
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
      path: '/login',
      name: 'Login',
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
    },
    {
      path: '/newProduct',
      name: 'newProduct',
      component: () => import('../views/NewProduct.vue'),
    },
  ]
});

export default router;
