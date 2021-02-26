import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookie from 'vue-cookie';

Vue.use(VueAxios, axios);

axios.interceptors.request.use(
  config => {
    const reqConfig = config;
    if (!config.headers['Authorization']) {
      reqConfig.headers['Authorization'] = VueCookie.get('jwt');
    }
    return reqConfig;
  },
  error => Promise.reject(error)
);
