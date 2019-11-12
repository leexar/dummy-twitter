import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faCog, faSignOutAlt, faHeart, faRetweet } from '@fortawesome/free-solid-svg-icons'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import 'normalize.css'
import './scss/imports.scss'
import './registerServiceWorker'

library.add(faHome, faCog, faSignOutAlt, faHeart, faRetweet, faReact);

window.axios = axios;
const token = localStorage.getItem('token')
if (token) {
  window.axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}

Vue.use(BootstrapVue);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    this.$store.dispatch('RELOAD_USER');
  }
}).$mount('#app')
