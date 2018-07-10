import Vue from 'vue'
import Router from 'vue-router'

import Home from './home'
import User from './user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/index'
    },
    ...Home,
    ...User
  ]
})
