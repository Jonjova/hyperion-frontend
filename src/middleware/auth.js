import store from '@/store';

export const authGuard = (to, from, next) => {
// console.log('TO:', to.fullPath, 'NAME:', to.name);
  // Login y ya autenticado → dashboard
  if (to.name === 'Login' && store.state.auth.isAuthenticated) {
    // console.log(store.state.auth.isAuthenticated);
     return next({ name: 'dashboard' });
  }

  // Ruta protegida y NO autenticado → login
  if (to.meta.requiresAuth && !store.state.auth.isAuthenticated) {
    return next({ name: 'Login' });
  }

  return next();
};