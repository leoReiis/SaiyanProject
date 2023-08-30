import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../components/Login.vue"
import Signup from "../components/Signup.vue"
import Dashboard from "../components/Dashboard.vue"

export const routes = createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path: "/login",
      component: Login,
      name: "login",
    },
    {
      path : "/signup",
      component: Signup,
      name : "signup"
    },
    {
      path : "/dashboard",
      component: Dashboard, 
      name: "dashboard"
    }
  ],
});
