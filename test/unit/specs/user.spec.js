import { vueMount, mutations } from './util'
import flushPromises from 'flush-promises'
import Login from '@/layouts/user/login'

describe('User', () => {
  it('should be able to login', async (done) => {
    const wrapper = vueMount(Login)
    wrapper.setData({
      form: {
        account: 'coxious@coxious.com',
        password: '12345Abcd',
        remember: true
      }
    })
    wrapper.find({ ref: 'btnLogin' }).trigger('click')
    wrapper.$vm.nextTick(() => {
      expect(mutations.setUserToken).toHaveBeenCalled()
      done()
    })
  })
})
