import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/css/main.css'

Vue.config.productionTip = false

// nav guards
router.beforeEach((to, from, next) => {
  // check for requiresAuth guards
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check if no user is logged in
    if (!firebase.auth().currentUser) {
      // go to Login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // check if a user is logged in
    if (firebase.auth().currentUser) {
      // go to root
      next({
        path: '/home',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
