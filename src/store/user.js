var state = {
  accessToken: window.localStorage.getItem('_AccessToken'),
  idToken: window.localStorage.getItem('_IdToken'),
  nickname: '',
  uuid: '',
  uniqueName: ''
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
    }
  }
}
