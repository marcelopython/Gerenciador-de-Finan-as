import Vue from 'vue'
import VueRouter from 'vue-router'
import { AUTH_TOKEN } from '@/plugins/apollo'
import authRoutes from '../modules/auth/router'
import dashboardRoutes from '../modules/dashboard/router'
import AuthService from '@/modules/auth/services/auth-service'

Vue.use(VueRouter)

const routes = [
  ...authRoutes,
  ...dashboardRoutes,
  { path: '', redirect: '/login' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const token = window.localStorage.getItem(AUTH_TOKEN)

    const loginRoute = {
      path: '/login',
      query: { redirect: to.fullPath }
    }

    if (token) {
      try {
        await AuthService.user({
          fetchPolicy: 'network-only'
        })
        return next()
      } catch (e) {
        console.log(loginRoute)
        console.log('Autho Login error', e)
        return next(loginRoute)
      }
    }
    return next(loginRoute)
  }

  next()
})

export default router
