import Vue from 'vue';
import VueRouter from 'vue-router';
import { authGuard } from '@/middleware/auth';
import { permissionGuard } from '@/middleware/permissions';

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
    path: '/login',
    name: 'Login',
    component: () => import('@/modules/auth/views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: { 
      requiresAuth: true,
      permission: 'dashboard.access',
       breadcrumb: [
            { text: 'Dashboard', to: '/dashboard' }
        ]
    }
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: () => import('@/views/admin/Users.vue'),
    meta: { 
      requiresAuth: true,
      permission: 'user.read',
      breadcrumb: [
            { text: 'Dashboard', to: '/dashboard' },
            { text: 'Usuarios', to: '/admin/users' }
        ]
    }
  },
  {
    path: '/admin/roles',
    name: 'Roles',
    component: () => import('@/views/admin/Roles.vue'),
    meta: { 
      requiresAuth: true,
      permission: 'role.manage'
    }
  },
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '*',
    redirect: '/dashboard'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(authGuard);
router.beforeEach(permissionGuard);

export default router;