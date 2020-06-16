import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/bootstrap.scss";
import "./assets/app.scss";
import { fb } from './firebase/firebaseConfig';
// import jQuery from "jquery";
import "popper.js";
// window.$ = window.jQuery = jQuery;




Vue.config.productionTip = false;

let app = '';

fb.auth().onAuthStateChanged(function () {

  if (!app) {
    new Vue({
      router,
      // store,
      render: h => h(App)
    }).$mount("#app");

  }

});


