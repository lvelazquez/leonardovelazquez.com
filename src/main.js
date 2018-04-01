import Vue from "vue";
import App from "./App.vue";
import projectsData from "./data";

Vue.config.productionTip = false;

new Vue({
  data: () =>  projectsData,
  render: h => h(App)
}).$mount("#app");
