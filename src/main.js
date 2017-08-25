// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Mint from 'mint-ui';
import router from './router'
import axios from 'axios';
import 'mint-ui/lib/style.css';
Vue.use(require('vue-wechat-title'));

Vue.use(Mint);
Vue.config.productionTip = false
Vue.prototype.$ajax = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})