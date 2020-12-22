import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Converter from "../components/Converter.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main
  },
  {
    path: "/converter",
    name: "Converter",
    component: Converter
  },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
