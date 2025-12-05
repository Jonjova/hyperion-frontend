// Aquí se definen las rutas para el módulo del administrador
export default [
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import('@/modules/admin/views/Users.vue'),
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
    name: 'AdminRoles',
    component: () => import('@/modules/admin/views/Roles.vue'),
    meta: {
      requiresAuth: true,
      permission: 'role.read',
      breadcrumb: [
        { text: 'Dashboard', to: '/dashboard' },
        { text: 'Roles', to: '/admin/roles' }
      ]
    }
  }
];