import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/search',
      name: 'searchPage',
      component: () => import( /* webpackChunkName: "about" */ './views/searchPage.vue')
    },
    {
      path: '/friends',
      name: 'friendsPage',
      component: () => import( /* webpackChunkName: "about" */ './views/friendsPage.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import( /* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/RegisterForm.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/Dashboard.vue')
    }
  ]
})
