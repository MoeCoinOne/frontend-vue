import Vue from 'vue'
import Vuex from 'vuex'
import User from './user'

Vue.use(Vuex)
const store = new Vuex.Store({})

store.registerModule('user', User)

export default store
