import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  vuetify,

  data: {
    message: "안녕하세요 Vue!"
  }
}).$mount("#app");