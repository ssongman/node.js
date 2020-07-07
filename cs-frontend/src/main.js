import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import dayjs from "dayjs";
import numeral from "numeral";
import "@/plugins/axios";
import VueSweetalert2 from "vue-sweetalert2";
// shared component
import PageDescriber from "@/components/shared/PageDescriber.vue";

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);

Vue.component(PageDescriber.name, PageDescriber);

Vue.filter("formatDate", date => {
  if (date) return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
});

Vue.filter("formatNumber", targetNum => {
  if (targetNum) return numeral(targetNum).format("0,0");
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
