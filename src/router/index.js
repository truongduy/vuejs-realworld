import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import HomePage from '@/pages/HomePage'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Article from '@/pages/Article'
import ArticleEdit from '@/pages/ArticleEdit'
import HomeTag from '@/pages/HomeTag'
import Settings from '@/pages/Settings'
import HomeMyFeed from '@/pages/HomeMyFeed'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'homepage',
          component: HomePage
        },
        {
          path: 'my-feed',
          name: 'home-my-feed',
          component: HomeMyFeed
        },
        {
          path: '/tags/:tag',
          name: 'home-tag',
          component: HomeTag,
          props: true
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/articles/:slug',
      name: 'article',
      component: Article,
      props: true
    },
    {
      path: '/editor/:slug?',
      name: 'article-edit',
      component: ArticleEdit
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
