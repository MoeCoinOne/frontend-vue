export default {
  state: {
    userToken: ''
  },
  mutations: {
    setUserToken (state, payload) {
      state.userToken = payload.userToken
    },
    clearUserToken (state) {
      state.userToken = ''
    }
  }
}
