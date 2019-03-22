import Vue from 'vue'
import App from './App.vue'
import selector from './lib/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './lib/style/element-variables.scss'

Vue.use(selector)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
