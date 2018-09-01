// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import VuePhotoPreview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import './common/style/element/theme/index.css'
import './common/directives'
import './common/plugins'

import './styles/common.css'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(VuePhotoPreview)

const i18n = new VueI18n({
  locale: 'zh-CN', // 默认语言
  // this.$i18n.locale 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./common/lang/zh-CN'),
    'en-US': require('./common/lang/en-US')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

console.log(`${process.env.APP_NAME} by ${process.env.AUTHOR} \n-----\nBuild Env: ${process.env.NODE_ENV} \nBuild Time: ${process.env.BUILD_TIME}.`)
