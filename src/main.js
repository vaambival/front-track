import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VueCookies from 'vue-cookies';

Vue.prototype.$http = Axios;

Vue.config.productionTip = false

Vue.use(VueCookies);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
