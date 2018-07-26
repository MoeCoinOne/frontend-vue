import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Login from '@/layouts/user/login'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('User', () => {
  let store
  let mutations

  beforeEach(() => {
    mutations = {
      setUserToken: jest.fn()
    }
    store = new Vuex.Store({})
    store.registerModule('user', {
      state: {},
      mutations
    })
  })

  it('should be able to login', () => {
    const wrapper = mount(Login)
    wrapper.setData({
      form: {
        account: 'coxious@coxious.com',
        password: '12345Abcd',
        remember: true
      }
    })
    wrapper.find({ ref: 'myButton' }).trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(mutations.setUserToken).toHaveBeenCalled()
    })
  })
})
