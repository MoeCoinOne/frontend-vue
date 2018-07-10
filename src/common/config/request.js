export default {
  domain: 'https://example.com/',
  requestHandler (options, next) {
    return next()
  },
  responseHandler (options, response, resolve, reject) {
    resolve(response)
  },
  api: {
    user: {
      login: 'user/login'
    }
  }
}
