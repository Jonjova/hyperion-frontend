import store from '@/store';

export const authGuard = (to, from, next) => {

  // Login y ya autenticado → dashboard
  if (to.name === 'Login' && store.state.auth.isAuthenticated) {
    return next({ name: 'Dashboard' });
  }

  // Ruta protegida y NO autenticado → login
  if (to.meta.requiresAuth && !store.state.auth.isAuthenticated) {
    return next({ name: 'Login' });
  }

  return next();
};