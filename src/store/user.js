var state = {
  accessToken: window.localStorage.getItem('_AccessToken'),
  idToken: window.localStorage.getItem('_IdToken'),
  refreshToken: window.localStorage.getItem('_RefreshToken'),
  identity: {},
  nickname: '',
  uuid: '',
  uniqueName: '',
  loginCallback: ''
}
try {
  state.identity = JSON.parse(window.localStorage.getItem('_Identity'))
} catch (err) {
  // pass
}

export default {
  state,
  mutations: {
    setUserToken (state, payload) {
      state.accessToken = payload.accessToken
      state.idToken = payload.idToken
      state.identity = payload.identity
      window.localStorage.setItem('_AccessToken', payload.accessToken)
      window.localStorage.setItem('_IdToken', payload.idToken)
      window.localStorage.setItem('_RefreshToken', payload.refreshToken)
      window.localStorage.setItem('_Identity', JSON.stringify(payload.identity))
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
      state.identity = {}
      window.localStorage.removeItem('_AccessToken')
      window.localStorage.removeItem('_IdToken')
      window.localStorage.removeItem('_RefreshToken')
      window.localStorage.removeItem('_Identity')
    },
    setLoginCallback (state, payload) {
      state.loginCallback = payload
    }
  }
}
