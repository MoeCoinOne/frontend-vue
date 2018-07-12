import Vue from 'vue'
import Router from 'vue-router'

import Home from './home'
import User from './user'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/home/explore'
    },
    ...Home,
    ...User
  ]
})
