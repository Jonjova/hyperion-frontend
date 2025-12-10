// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AuthPlugin from './plugins/auth';

// Importar notificaciones
import Notifications from 'vue-notification';

// PrimeVue Configuration
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'; // Tema
import 'primevue/resources/primevue.min.css'; // Estilos base
import 'primeicons/primeicons.css'; // Iconos
import './assets/css/global.css';

// Importar configuraciones
import './config/axios';


Vue.use(Notifications);

// Usar plugins
Vue.use(AuthPlugin);

// PrimeVue
Vue.use(PrimeVue, { 
    ripple: true  // Activar efecto ripple para mejor UX
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  async beforeCreate() {
    // Inicializar antes de renderizar la app
    await this.$store.dispatch('auth/initialize');
  }
}).$mount('#app');