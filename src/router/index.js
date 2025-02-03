import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import MainPage from '../views/MainPage'
import Home from '../views/Home'
import Categories from '../views/Categories'
import Products from '../views/Products'
import Banners from '../views/Banners'
import NotFoundPage from '../views/NotFoundPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Shoppal CMS - Login'
    }
  },
  {
    path: '/',
    component: MainPage,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          title: 'Shoppal CMS - Home'
        }
      },
      {
        path: '/categories',
        name: 'Categories',
        component: Categories,
        meta: {
          title: 'Shoppal CMS - Categories'
        }
      },
      {
        path: '/categories/:CategoryId/products',
        name: 'Products',
        component: Products,
        meta: {
          title: 'Shoppal CMS - Products by Category'
        }
      },
      {
        path: '/banners',
        name: 'Banners',
        component: Banners,
        meta: {
          title: 'Shoppal CMS - Banners'
        }
      }
    ]
  },
  {
    path: '*',
    component: NotFoundPage,
    meta: {
      title: '404 - Not Found Page'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'E-Commerce CMS'
  const isAuthenticated = localStorage.access_token
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else if (to.name === 'Login' && isAuthenticated) next({ name: 'Home' })
  else next()
})

export default router
