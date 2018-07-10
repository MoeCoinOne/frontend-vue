/**
 * http访问
 * 对vue-resource的封装
 *
 * 2018年7月10日 17:01:30
 */

import Request from './request'

function plugin (Vue, option) {
  if (plugin.installed) {
    return
  }

  Vue.request = new Request(option)
  Object.defineProperties(Vue.prototype, {
    $request: {
      get () {
        return Vue.request
      }
    }
  })
}

export default plugin
