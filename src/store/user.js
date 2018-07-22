var state = {
  accessToken: window.localStorage.getItem('_AccessToken'),
  idToken: window.localStorage.getItem('_IdToken')
}

export default {
  state,
  mutations: {
    setUserToken (state, payload) {
      state.accessToken = payload.accessToken
      state.idToken = payload.idToken
      window.localStorage.setItem('_AccessToken', payload.accessToken)
      window.localStorage.setItem('_IdToken', payload.idToken)
    },
    clearUserToken (state) {
      state.accessToken = ''
      state.idToken = ''
      window.localStorage.removeItem('_AccessToken')
      window.localStorage.removeItem('_IdToken')
    }
  }
}
