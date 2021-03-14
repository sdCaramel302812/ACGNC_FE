import Vue from 'vue';
import VueRouter from 'vue-router';
import jwt from 'jsonwebtoken';
import VueCookie from 'vue-cookie';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import ACGNSearch from '@/views/ACGNSearch.vue';
import ACGNList from '@/views/ACGNList';
import ACGNAdd from '@/views/ACGNAdd.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'acgn-search',
        component: ACGNSearch,
        children: [
          {
            path: '/',
            component: ACGNList,
          },
          {
            path: 'add',
            component: ACGNAdd,
          },
        ],
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  let token = VueCookie.get('jwt');
  if (token) {
    const decode = jwt.decode(token);
    const now = Date.now();
    if (decode.exp < now / 1000) {
      VueCookie.set('jwt', '');
      token = '';
    }
  } 
  if (token) {
    if (to.path === '/login') {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    if (to.path !== '/login') {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  }
});

export default router;
