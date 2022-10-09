import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import { auth } from "../store/db";
import i18n from "../i18n";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: `/${i18n.locale}`,
  },
  {
    path: "/:lang",
    component: {
      render(c: any) {
        return c("router-view");
      },
    },
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
        meta: { requiredAuth: true },
      },
      {
        path: "LoginView",
        name: "LoginView",
        component: LoginView,
      },
      {
        path: "RegisterView",
        name: "RegisterView",
        component: RegisterView,
      },
      {
        path: "FavoritesPage",
        name: "FavoritesPage",
        meta: { requiredAuth: true },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "FavoritesPage" */ "../views/FavoritesPage.vue"
          ),
      },
      {
        path: "DetailPage/:id",
        name: "DetailPage",
        component: () => import("@/views/DetailPage.vue"),
        meta: { requiredAuth: true },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
