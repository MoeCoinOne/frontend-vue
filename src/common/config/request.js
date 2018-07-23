export default {
  domain: 'http://moewebapp.qvwznnvemk.us-east-1.elasticbeanstalk.com/api/v1/',
  requestHandler (options, next) {
    return next()
  },
  responseHandler (options, response, resolve, reject) {
    resolve(response)
  },
  api: {
    user: {
      login: 'auth/login',
      register: 'users/signup',
      checkMail: 'users/isEmailAvailable',
      confirmMail: 'users/confirmSignup',
      sendForgetCode: 'users/initiateForgotPassword',
      confirmForget: 'users/confirmForgotPassword'
    },
    account: {
      userinfo: 'users/userinfo'
    },
    subscription: {
      type: 'subscription/subscriptionType'
    }
  }
}
