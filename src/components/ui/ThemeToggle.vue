<!-- src/components/ui/ThemeToggle.vue -->
<template>
  <div class="theme-toggle">
    <button
      @click="toggleTheme"
      class="theme-toggle-btn"
      :title="`Cambiar tema (${currentThemeName})`"
    >
      <i v-if="isDarkMode" class="pi pi-sun"></i>
      <i v-else class="pi pi-moon"></i>
    </button>
    
    <div v-if="showThemeList" class="theme-dropdown">
      <div 
        v-for="theme in availableThemes" 
        :key="theme.id"
        class="theme-option"
        @click="setTheme(theme.id)"
        :class="{ 'active': theme.id === currentTheme }"
      >
        <span class="theme-name">{{ theme.name }}</span>
        <span class="theme-indicator" :style="{ backgroundColor: getThemeColor(theme.id) }"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeToggle',
  data() {
    return {
      showThemeList: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters['theme/theme'];
    },
    currentThemeName() {
      const theme = this.$store.getters['theme/availableThemes'].find(
        t => t.id === this.currentTheme
      );
      return theme ? theme.name : '';
    },
    availableThemes() {
      return this.$store.getters['theme/availableThemes'];
    },
    isDarkMode() {
      return this.$store.getters['theme/isDarkMode'];
    }
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch('theme/toggleTheme');
    },
    setTheme(themeId) {
      this.$store.dispatch('theme/setTheme', themeId);
      this.showThemeList = false;
    },
    getThemeColor(themeId) {
      const colors = {
        'blue-dark': '#2563eb',
        'light': '#f8fafc',
        'dark': '#1a1a1a',
        'black': '#000000'
      };
      return colors[themeId] || '#2563eb';
    }
  },
  mounted() {
    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.theme-toggle')) {
        this.showThemeList = false;
      }
    });
  }
};
</script>

<style scoped>
.theme-toggle {
  position: relative;
  display: inline-block;
}

.theme-toggle-btn {
  padding: var(--spacing-sm);
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  cursor: pointer;
  color: var(--text-primary);
  transition: var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle-btn:hover {
  background: var(--primary-light, rgba(179, 189, 207, 0.1));
  border-color: var(--primary-color);
}

.theme-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--spacing-sm);
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  min-width: 180px;
  z-index: 1000;
}

.theme-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  cursor: pointer;
  transition: var(--transition-fast);
}

.theme-option:hover {
  background: var(--primary-light, rgba(37, 99, 235, 0.1));
}

.theme-option.active {
  background: var(--primary-light, rgba(37, 99, 235, 0.2));
  color: var(--primary-color);
}

.theme-name {
  font-size: var(--font-size-sm);
}

.theme-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
}
</style>