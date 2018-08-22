import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import './registerServiceWorker';

import './styles/quasar.styl';
import 'quasar-extras/animate';
import 'quasar-extras/roboto-font';
import 'quasar-extras/material-icons';
// @ts-ignore
import Quasar from 'quasar';
import 'quasar-framework/dist/umd/quasar.mat.min.css';

Vue.use(Quasar, {
  config: {}
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
