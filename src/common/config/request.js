export default {
  domain: 'https://virtserver.swaggerhub.com/MoeCoinOne/Web/1.0.0/',
  requestHandler (options, next) {
    return next()
  },
  responseHandler (options, response, resolve, reject) {
    resolve(response)
  },
  api: {
    user: {
      login: 'auth/login'
    }
  }
}
