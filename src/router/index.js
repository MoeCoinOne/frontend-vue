import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Home from './home'
import User from './user'
import Account from './account'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/home/index'
    },
    ...Home,
    ...User,
    ...Account
  ]
})

let routeRule = {
  allow: [
    /^\/c\//,
    /^\/user\//,
    /^\/home\/index/,
    /^\/home\/explore/
  ],
  extraDisallow: [
  ]
}

function isAllow (path) {
  // 优先匹配需要登录的规则
  for (let rule of routeRule.extraDisallow) {
    if (rule.test(path)) {
      return false
    }
  }
  // 匹配允许的规则
  for (let rule of routeRule.allow) {
    if (rule.test(path)) {
      return true
    }
  }
  // 默认不允许
  return false
}

router.beforeEach(function (to, from, next) {
  if (store.state.user.accessToken &&
    store.state.user.identity &&
    store.state.user.identity.accessKeyId) {
    next()
  } else {
    // 非登录状态
    if (isAllow(to.path)) {
      next()
    } else {
      let callback = JSON.stringify({
        path: to.path,
        query: to.query,
        params: to.params
      })
      next({ path: '/user/login', query: { callback } })
    }
  }
})

export default router
