import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'swiper/css/swiper.min.css'
import { Backtop, Icon, Message, MessageBox, Dialog, Form, FormItem, Input } from 'element-ui'

Vue.use(Icon)
Vue.use(Backtop)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
