import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import VueRouter from "vue-router";
import axios from "axios";
import router from "./router";

import vuetify from '@/plugins/vuetify'

Vue.use(VueRouter);
Vue.prototype.$http = axios;

new Vue({
  render: (h) => h(App),
  router,
  vuetify,
}).$mount("#app");
