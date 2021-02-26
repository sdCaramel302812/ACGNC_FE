import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store.js';
import VueCookie from 'vue-cookie';
import './plugins/axios';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueCookie);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
