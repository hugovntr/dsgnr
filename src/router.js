import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'index', component: () => import(/* webpackChunkName: "index" */'./views/Index.vue')},

    {
      path: '/:user',
      component: () => import('./RouterViews/UserIndex.vue'),
      children: [
        { path: '/', name: 'home', component: () => import(/* webpackChunkName: "home" */'./views/Home.vue'), },
        { path: 'admin', name: 'admin', component: () => import(/* webpackChunkName: "admin" */ './views/admin/Index.vue'), },
        {
          path: 'admin/portfolio/:slug', component: () => import('./RouterViews/RouterView.vue'),
          children: [
            { path: 'edit', name: "adminEditPost", component: () => import('./views/admin/EditPost.vue') },
            { path: 'delete', name: "adminDeletePost", component: () => import('./views/admin/DeletePost.vue') }
          ],
        },
        { path: 'about', name: 'about', component: () => import(/* webpackChunkName: "about" */ './views/About.vue') },
        { path: 'project/:slug', name: 'project', component: () => import('./views/Project.vue') },
        { path: 'portfolio/:page?', name: 'portfolio', component: () => import('./views/Page.vue'), props: { name: 'Portfolio' } },
        { path: 'blog', name: 'blog', component: () => import('./views/Page.vue'), props: { name: 'Blog' } }
      ],
    },
  ]
})
