import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { getCookie }  from '../request';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue'),
  },
];

const whiteList=['/login'];//不需要登录能访问的path

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('beforeEach');
  var token = getCookie('token');
  if(whiteList.indexOf(to.path) < 0){
    if(token){
      next();
    }else{
      if(to.path=='/login'){
        next();
      }else{
        next('/login');
      }
    }
  }
  else{
    next();
  }
});


export default router;
