import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

class Request {
  constructor (config) {
    this.__config = config
  }

  $getApi (name) {
    let currentApi = this.__config.api
    let keyList = name.split('.')
    for (let key of keyList) {
      currentApi = currentApi[key]
    }

    return this.__config.domain + currentApi
  }

  $handleRequest (method, option) {
    let url = 'url' in option ? option.url : this.$getApi(option.name)
    let config = 'config' in option ? option.config : {}
    let params = 'params' in option ? option.params : {}
    if ('body' in option) {
      return Vue.http[method](url, option.body, {
        params,
        ...config
      })
    } else {
      return Vue.http[method](url, {
        params,
        ...config
      })
    }
  }

  $fetch (method, option) {
    let next = () => {
      // 处理 responseHandler
      return this.$handleRequest(method, option).then(response => {
        return new Promise((resolve, reject) => {
          if ('responseHandler' in this.__config && typeof this.__config.responseHandler === 'function') {
            this.__config.responseHandler(option, response, resolve, reject)
          } else {
            resolve(response)
          }
        })
      })
    }
    // 处理 requestHandler
    if ('requestHandler' in this.__config && typeof this.__config.requestHandler === 'function') {
      return this.__config.requestHandler(option, next)
    } else {
      return next()
    }
  }

  get (option) {
    return this.$fetch('get', option)
  }

  post (option) {
    return this.$fetch('post', option)
  }

  delete (option) {
    return this.$fetch('delete', option)
  }

  put (option) {
    return this.$fetch('put', option)
  }

  patch (option) {
    return this.$fetch('patch', option)
  }
}

export default Request
