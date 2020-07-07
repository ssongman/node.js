import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import test1 from "../views/test1.vue";
import t2_tooltip from "../views/t2_tooltip.vue";
import t3_table from "../views/t3_table.vue";
import t4_card from "../views/t4_card.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/test1",
    name: "test1",
    component: test1
  },
  {
    path: "/t2_tooltip",
    name: "t2_tooltip",
    component: t2_tooltip
  },
  {
    path: "/t3_table",
    name: "t3_table",
    component: t3_table
  },
  {
    path: "/t4_card",
    name: "t4_card",
    component: t4_card
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
