import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/admin/Index.vue'),
      // children: [
      //   {
      //     path: 'edit/:slug',
      //     name: 'adminEditPost',
      //     component: () => import('./views/admin/EditPost.vue')
      //   }
      // ]
    },
    {
      path: '/admin/edit/:slug',
      name: 'adminEditPost',
      component: () => import('./views/admin/EditPost.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/project/:slug',
      name: 'project',
      component: () => import('./views/Project.vue')
    }
  ]
})
