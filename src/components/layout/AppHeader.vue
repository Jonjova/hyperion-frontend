<!-- src/components/layout/AppHeader.vue -->
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
            <!-- 🔥 BOTÓN DE TEMA AL LADO DEL NOMBRE -->
            <button class="theme-btn" @click="toggleTheme" :title="theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'">
              <span class="theme-icon" v-if="theme === 'light'">🌙</span>
              <span class="theme-icon" v-else>🌞</span>
            </button>

            <span class="user-name">{{ userName }}</span>

            <BaseButton variant="secondary" size="small" @click="logout">
              Salir
            </BaseButton>
          </div>
        </slot>

      </div>

    </div>
  </header>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import { mapState, mapGetters } from 'vuex';
import { loadTheme } from "@/utils/themeLoader";

export default {
  name: 'AppHeader',
  components: { BaseButton },

  props: {
    title: {
      type: String,
      default: 'Hyperion'
    }
  },

  computed: {
    ...mapGetters('auth', ['userName', 'isAuthenticated']),
    ...mapState('theme', ['theme'])
  },

  methods: {
    toggleTheme() {
      const newTheme = this.theme === "light" ? "dark" : "light";

      // 🔥 Actualizar store
      this.$store.dispatch("theme/setTheme", newTheme);

      // 🔥 Aplicar a <html> con loadTheme()
      loadTheme(newTheme);
    },

    async logout() {
      try {
        await this.$auth.logout();
        this.$router.push('/login');
      } catch (error) {
        console.error('Error durante logout:', error);
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style scoped>
.app-header {
  background: var(--surface-color);
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
  transition: background 0.3s ease, color 0.3s ease;
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

/* 🔥 BOTÓN DE TEMA MINIMALISTA */
.theme-btn {
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--text-color);
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-right: 8px; /* 🔥 Espacio entre botón y nombre */
}

.theme-btn:hover {
  background-color: var(--surface-hover);
}

.theme-icon {
  font-size: 1.1rem;
  line-height: 1;
}

/* MENÚ DE USUARIO */
.user-menu {
  display: flex;
  align-items: center;
  gap: 6px;
}

.user-name {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-right: 4px; /* 🔥 Espacio entre nombre y botón salir */
  color: var(--text-color);
}
</style>