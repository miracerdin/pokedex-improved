import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueObserveVisibility from "vue-observe-visibility";
import { firestorePlugin } from "vuefire";
import { auth } from "./store/db";
import i18n from "./i18n";

Vue.use(firestorePlugin);

Vue.use(VueObserveVisibility);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const requiredAuth = to.matched.some((record) => record.meta.requiredAuth);
  const isAuthenticated = auth.currentUser;
  if (requiredAuth && !isAuthenticated) {
    next("/LoginView");
  } else {
    next();
  }
  let language = to.params.lang;
  if (!language) {
    language = "en";
  } else if (localStorage.getItem("lang") === "en") {
    return (language = "en");
  } else {
    language = "tr";
  }

  // set the current language for i18n.
  i18n.locale = language;
  next();
});

let app: object;

auth.onAuthStateChanged((user) => {
  console.log(user);
  if (!app) {
    app = new Vue({
      router,
      store,
      i18n,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
