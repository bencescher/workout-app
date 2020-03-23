import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/',
    name: 'Landing',
    meta: { requiresGuest: true },
    component: () => import('../views/Landing.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { requiresGuest: true },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { requiresGuest: true },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    meta: { requiresAuth: true },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/new',
    name: 'NewWorkout',
    meta: { requiresAuth: true },
    component: () => import('../views/NewWorkout.vue')
  },
  {
    path: '/log',
    name: 'WorkoutLog',
    meta: { requiresAuth: true },
    component: () => import('../views/WorkoutLog.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
