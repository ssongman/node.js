import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);

const router = new Router({
  base: "/",
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/cs-team"
    },
    // {
    //   path: "/sign",
    //   name: "SignIn",
    //   component: () => import("@/views/sign/Sign.vue")
    // },
    // {
    //   path: "/find",
    //   name: "Find",
    //   component: () => import("@/views/sign/Find.vue")
    // },
    // {
    //   path: "/reference-site",
    //   name: "ReferenceSite",
    //   component: () => import("@/views/ReferenceSite.vue")
    // },
    // {
    //   path: "/landing",
    //   name: "Landing",
    //   component: () => import("@/views/Landing.vue")
    // },
    // {
    //   path: "/emplyee-mgmt",
    //   name: "EmployeeMgmt",
    //   component: () => import("@/views/EmployeeMgmt.vue")
    //   // meta: { requiresAuth: true }
    // },
    {
      path: "/cs-team",
      name: "CsTeamStateMgmt",
      // component: () => import("@/views/EmployeeMgmt.vue")
      component: () => import("@/views/CsTeamStateMgmt.vue")
      // meta: { requiresAuth: true }
    },
    // {
    //   path: "/my-crud",
    //   name: "MyCrud",
    //   component: () => import("@/views/MyCrud.vue"),
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: "/dashboard",
    //   name: "Dashboard",
    //   component: () => import("@/views/dashboard/Dashboard.vue"),
    //   meta: { requiresAuth: true }
    // },
    {
      path: "*",
      redirect: "/"
    }
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

// Route guard checks to see if you are logged in, if not reroutes to login
// to is where you are going, matched.some is to find which routes have requiresAuth
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.authorized) {
      next({
        path: "/sign",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
