var state = {
  accessToken: window.localStorage.getItem('_AccessToken'),
  idToken: window.localStorage.getItem('_IdToken'),
  refreshToken: window.localStorage.getItem('_RefreshToken'),
  nickname: '',
  uuid: '',
  uniqueName: '',
  loginCallback: ''
}

export default {
  state,
  mutations: {
    setUserToken (state, payload) {
      state.accessToken = payload.accessToken
      state.idToken = payload.idToken
      window.localStorage.setItem('_AccessToken', payload.accessToken)
      window.localStorage.setItem('_IdToken', payload.idToken)
      window.localStorage.setItem('_RefreshToken', payload.refreshToken)
    },
    setUserInfo (state, payload) {
      for (let key in payload) {
        state[key] = payload[key]
      }
    },
    clearUserToken (state) {
      state.accessToken = ''
      state.idToken = ''
      state.nickname = ''
      state.uuid = ''
      state.uniqueName = ''
      window.localStorage.removeItem('_AccessToken')
      window.localStorage.removeItem('_IdToken')
      window.localStorage.removeItem('_RefreshToken')
    },
    setLoginCallback (state, payload) {
      state.loginCallback = payload
    }
  }
}
