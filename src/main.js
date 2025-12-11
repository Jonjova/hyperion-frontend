// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AuthPlugin from './plugins/auth';

// Notificaciones
import Notifications from 'vue-notification';

// PrimeVue
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// Estilos globales
import './assets/css/global.css';

// Config axios
import './config/axios';

// Loader de temas
import { loadTheme, getSavedTheme } from '@/utils/themeLoader';

Vue.use(Notifications);
Vue.use(AuthPlugin);

Vue.use(PrimeVue, {
    ripple: true
});

Vue.config.productionTip = false;

// IMPORTANTE: Cargar tema INMEDIATAMENTE, antes de crear Vue
const savedTheme = getSavedTheme();
loadTheme(savedTheme);

// Crear la instancia de Vue
new Vue({
  router,
  store,
  render: h => h(App),

  async beforeCreate() {
    try {
      // Inicializar autenticación
      await this.$store.dispatch('auth/initialize');
      
      // Sincronizar tema del store con el actual
      const currentTheme = getSavedTheme();
      this.$store.commit('theme/SET_THEME', currentTheme);
      
    } catch (error) {
      console.error('Error en inicialización:', error);
    }
  }
}).$mount('#app');