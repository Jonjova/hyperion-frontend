import Vue from 'vue';
import VueRouter from 'vue-router';
import { authGuard } from '@/middleware/auth';
import { permissionGuard } from '@/middleware/permissions';

import adminRoutes from '@/modules/admin/routes';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') throw err;
  });
};

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') throw err;
  });
};

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/modules/auth/views/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/dashboard/Dashboard.vue"),
    meta: {
      requiresAuth: true,
      permission: "dashboard.access",
    },
  },
  ...adminRoutes,
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "*",
    redirect: "/login",
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(authGuard);
router.beforeEach(permissionGuard);

export default router;