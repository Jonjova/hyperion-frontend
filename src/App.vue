<template>
  <div id="app">
    <AppLoader v-if="isInitializing" />
    <Login v-else-if="!isAuthenticated" />
    <AdminLayout v-else>
    </AdminLayout>
  </div>
</template>

<script>
import AppLoader from '@/components/ui/AppLoader.vue';
import AdminLayout from './views/AdminLayout.vue';
import Login from './modules/auth/views/Login.vue';

export default {
  name: 'App',
  components: {
    AppLoader,
    AdminLayout,
    Login
  },
  data() {
    return {
      isInitializing: true
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    }
  },
  async created() {
    // Inicializar autenticación
    try {
      await this.$store.dispatch('auth/initialize');
    } catch (error) {
      console.error('Error inicializando:', error);
    } finally {
      this.isInitializing = false;
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #180404;
}

#app {
  min-height: 100vh;
}

/* Utilidades globales */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }

.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }

.p-1 { padding: 0.5rem; }
.p-2 { padding: 1rem; }
.p-3 { padding: 1.5rem; }
.p-4 { padding: 2rem; }
</style>