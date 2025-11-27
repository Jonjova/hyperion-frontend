import Vue from 'vue';
import App from './App.vue';
import router from '../router';
import store from './store';
import { PermissionMixin } from './utils/permissions';
import AuthPlugin from './plugins/auth';

// PrimeVue Configuration
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'; // Tema
import 'primevue/resources/primevue.min.css'; // Estilos base
import 'primeicons/primeicons.css'; // Iconos

// Mixin global para permisos
Vue.mixin(PermissionMixin);

// Plugin de autenticación
Vue.use(AuthPlugin);

// PrimeVue
Vue.use(PrimeVue);

Vue.config.productionTip = false;

// Notificación global simple
Vue.prototype.$notify = function(options) {
  if (options.type === 'success') {
    alert('✅ ' + options.message);
  } else if (options.type === 'error') {
    alert('❌ ' + options.message);
  }
};

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('auth/checkAuth');
  }
}).$mount('#app');