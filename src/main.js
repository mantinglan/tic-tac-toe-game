// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import Lodash from 'lodash'


Vue.config.productionTip = false

Vue.use(Lodash)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
