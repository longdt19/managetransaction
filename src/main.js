import Vue from 'vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/vi'
import moment from 'moment'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  locale
})

moment.locale('vi')
// Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
