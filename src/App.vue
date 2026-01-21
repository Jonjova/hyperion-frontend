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

