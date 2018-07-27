export default {
  domain: process.env.NODE_ENV === 'production' ? 'https://develop-test.encore.moe/api/v1/' : 'http://moewebapp.qvwznnvemk.us-east-1.elasticbeanstalk.com/api/v1/',
  requestHandler (options, next) {
    return next()
  },
  responseHandler (options, response, resolve, reject) {
    resolve(response)
  },
  api: {
    user: {
      login: 'auth/login',
      refreshToken: 'auth/refreshToken',
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
      relationship: 'subscription/relationship',
      type: 'subscription/subscriptionType'
    },
    payments: 'payments'
  }
}
