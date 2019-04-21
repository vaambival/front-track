import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VueCookies from 'vue-cookies';
import vSelect from 'vue-select'
import VueEditor from 'vue2-editor'

Vue.component('v-select', vSelect)
Vue.component("v-select", vSelect.VueSelect);
Vue.component('vue2-editor', VueEditor)

Vue.prototype.$http = Axios;

Vue.config.productionTip = false

Vue.use(VueCookies);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
