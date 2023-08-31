import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../components/Login.vue"
import Signup from "../components/Signup.vue"
import Dashboard from "../components/Dashboard.vue"
import Exercises from "../components/Exercises.vue"
import Students from "../components/Students.vue"
import RegisterStudent from "../components/RegisterStudent.vue"
import Training from "../components/Training.vue"

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
    },

    {
      path: "/exercises",
      component: Exercises,
      name: "Exercises"
    },
    {
      path: "/students",
      component: Students,
      name: "students"
    },
    {
      path: "/registerstudent",
      component: RegisterStudent,
      name: "registerStudent"
    },
    {
      path: "/training",
      component: Training,
      name: Training
    }
  ],
});
