import Vue from "vue";
import Router from "vue-router";

const Main = () => import("@/views/main/Main.vue");
const Test = () => import("@/views/main/Test.vue");
Vue.use(Router);

export default new Router({
  base: "/",
  mode: "history",
  linkActiveClass: "open active",
  routes: [
    {
      name: "Main",
      path: "/",
      component: Main,
    },
    {
      name: "Test",
      path: "/screen2",
      component: Test,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    console.log(to)
    console.log(from)
    console.log(savedPosition)
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
