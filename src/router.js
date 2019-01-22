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
    },

    /*
    * Portfolio Administration Routes
    */
    {
      path: '/admin/portfolio/:slug', component: () => import('./views/admin/RouterComponent.vue'),
      children: [
        {path: 'edit', name: "adminEditPost", component: () => import('./views/admin/EditPost.vue')},
        {path: 'delete', name: "adminDeletePost", component: () => import('./views/admin/DeletePost.vue')}
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/project/:slug',
      name: 'project',
      component: () => import('./views/Project.vue')
    },
    {
      path: '/portfolio/:page?',
      name: 'portfolio',
      component: () => import('./views/Page.vue'),
      props: { name: 'Portfolio' }
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('./views/Page.vue'),
      props: { name: 'Blog' }
    }
  ]
})
