import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import router from './router';
import store from './store';

Vue.use(ElementUI);
// Vue.use(VueAxios, axios)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
