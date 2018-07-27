import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
// 自定义插件
import Request from '@/common/plugins/request'
import { RequestConfig } from '@/common/config'
// 自定义指令
import DirectiveTitle from '@/common/directives/title'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueI18n)
localVue.use(ElementUI)
localVue.use(Request, RequestConfig)
localVue.directive('title', DirectiveTitle)

let i18n = new VueI18n({
  locale: 'zh-CN', // 默认语言
  // this.$i18n.locale 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('@/common/lang/zh-CN')
  }
})

let store = new Vuex.Store({})
let mutations = {
  setUserToken: jest.fn()
}
store.registerModule('user', {
  state: {},
  mutations
})

function vueMount (component) {
  return mount(component, {
    localVue,
    i18n,
    store,
    stubs: ['router-link', 'router-view']
  })
}

export {
  vueMount,
  mutations
}
