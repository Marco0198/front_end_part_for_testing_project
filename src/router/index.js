import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/pages/Home.vue";
import About from "../views/pages/About.vue";
import Contact from "../views/pages/Contact.vue";
import Taskboard from "../views/pages/Taskboard.vue";
import Login from "../views/pages/auth/Login.vue";
import Register from "../views/pages/auth/Register.vue";
import RequestResetPassword from "../views/pages/auth/RequestResetPassword.vue";
import ResetPassword from "../views/pages/auth/ResetPassword.vue";
import NotFound from "../views/pages/NotFound.vue";



Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/Taskboard",
    name: "Taskboard",
    component: Taskboard,
  },
 
 
    {
    path: "/login",
    name: "login",
    component: Login,
   
  },
   {
    path: "/register",
    name: "register",
    component: Register,
   
  },
    {
    path: "/request_token",
    name: "RequestResetPassword",
    component: RequestResetPassword,
   
  },
   {
    path: "/reset_password",
    name: "ResetPassword",
    component: ResetPassword,
   
  },
   {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
   
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
