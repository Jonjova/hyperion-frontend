<template>
  <header class="app-header">
    <div class="header-content">
      <div class="header-left">
        <slot name="left">
          <h1 class="app-title">{{ title }}</h1>
        </slot>
      </div>
      
      <div class="header-center">
        <slot name="center"></slot>
      </div>
      
      <div class="header-right">
        <slot name="right">
          <div class="user-menu" v-if="$auth.isAuthenticated">
            <span class="user-name">Hola, {{ $auth.user?.name }}</span>
            <BaseButton variant="secondary" size="small" @click="logout">
              Cerrar Sesión
            </BaseButton>
          </div>
        </slot>
      </div>
    </div>
  </header>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'AppHeader',
  components: {
    BaseButton
  },
  props: {
    title: {
      type: String,
      default: 'Mi Aplicación'
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  }
};
</script>

<style scoped>
.app-header {
  background: linear-gradient(to right, #000000da, #434343);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
}

.header-left,
.header-center,
.header-right {
  display: flex;
  align-items: center;
}

.app-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-name {
  font-weight: 500;
}
</style>