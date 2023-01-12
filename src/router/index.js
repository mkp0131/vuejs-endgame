import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    // 코드 스플리팅
    component: () => import('@/views/LoginView.vue'),
    beforeEnter: (to, from, next) => {
      const accessToken = store.state.user.accessToken;

      if (accessToken) {
        return next('/main');
      } else {
        return next();
      }
    },
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/SignupView.vue'),
  },
  {
    path: '/main',
    name: 'main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/MainView.vue'),
    beforeEnter: (to, from, next) => {
      const accessToken = store.state.user.accessToken;

      if (accessToken) {
        return next();
      } else {
        return next('/login');
      }
    },
  },
  {
    path: '/add',
    name: 'add',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/AddView.vue'),
    beforeEnter: (to, from, next) => {
      const accessToken = store.state.user.accessToken;

      if (accessToken) {
        return next();
      } else {
        return next('/login');
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
