import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../components/Login.vue"

export const routes = createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path: "/login",
      component: Login,
      name: "login",
    }
  ],
});
