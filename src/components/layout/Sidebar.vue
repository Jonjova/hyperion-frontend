<template>
  <aside
    class="sidebar"
    :class="{
      'sidebar--collapsed': collapsed && !isMobile,
      'sidebar--mobile-hidden': collapsed && isMobile
    }"
  >
    <div class="sidebar-header">
      <button
        @click="$emit('toggle')"
        class="toggle-btn"
        :title="collapsed ? 'Expandir' : 'Contraer'"
      >
        <i class="pi" :class="collapsed ? 'pi-bars' : 'pi-times'"></i>
      </button>
    </div>

    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li v-for="item in navigation" :key="item.to" class="nav-item">
          <router-link
            :to="item.to"
            class="nav-link"
            :class="{
              'nav-link--active': $route.path.startsWith(item.to),
              'nav-link--mobile': isMobile
            }"
            :title="item.text"
          >
            <i class="nav-icon" :class="item.icon"></i>
            <span class="nav-text">{{ item.text }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    navigation: {
      type: Array,
      default: () => [
        { to: '/dashboard', text: 'Dashboard', icon: 'pi pi-chart-bar' },
        { to: '/admin/users', text: 'Usuarios', icon: 'pi pi-users' },
        { to: '/admin/roles', text: 'Roles', icon: 'pi pi-lock' }
      ]
    }
  },
  emits: ['toggle'],
  
  data() {
    return {
      isMobile: false
    };
  },
  
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
    
    // Set initial state
    if (!this.collapsed && this.isMobile) {
      document.body.classList.add('sidebar-open');
    }
  },
  
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
    document.body.classList.remove('sidebar-open');
  },
  
  watch: {
    collapsed: {
      immediate: true,
      handler(newVal) {
        if (this.isMobile) {
          if (!newVal) {
            document.body.classList.add('sidebar-open');
          } else {
            document.body.classList.remove('sidebar-open');
          }
        }
      }
    },
    
    isMobile(newVal) {
      // If changing from mobile to desktop and sidebar is open, close it
      if (!newVal && !this.collapsed) {
        this.$emit('toggle');
      }
    }
  },
  
  methods: {
    checkMobile() {
      // this.isMobile = window.innerWidth <= 768;
    }
  }
};
</script>

<style scoped>
/* ===========================
   SIDEBAR GENERAL
=========================== */
.sidebar {
  width: 200px;
  background: white;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease;
  height: calc(100vh - 65px); /* altura usable abajo del header */
  
  position: fixed;
  top: 65px;  /* <-- espacio del header */
  left: 0;
  z-index: 1000;
  overflow-y: auto; /* scroll interno opcional */
}

.sidebar--collapsed {
  width: 50px;
}

/* ===========================
   NAVEGACIÓN
=========================== */
.sidebar-nav {
  flex: 1;
  padding: 8px 0;
  background: var(--surface-color);
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 2px 8px;
}

/* ===========================
   LINKS
=========================== */
.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  text-decoration: none;
  color: var(--text-color);
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  min-height: 40px;
  box-sizing: border-box;
}

.nav-link:hover {
  background: var(--primary-color);
  color: var(--text-color);
}

.nav-link--active {
  background-color: var(--primary-color);
  color: var(--text-color);
  font-weight: 500;
  padding: 10px 12px;
  min-height: 40px;
}

/* ===========================
   COLAPSADO (desktop)
=========================== */
.sidebar--collapsed .nav-link {
  justify-content: center;
  padding: 10px;
}

.sidebar--collapsed .nav-text {
  opacity: 0;
  width: 0;
  position: absolute;
}

.sidebar--collapsed .nav-icon {
  margin-right: 0;
  font-size: 1.2rem;
}

/* ===========================
   ICONOS
=========================== */
.nav-icon {
  margin-right: 12px;
  font-size: 1rem;
  min-width: 16px;
  text-align: center;
  transition: margin 0.2s ease;
}

/* ===========================
   TOGGLE
=========================== */
.toggle-btn {
  width: 100%;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  padding: 6px;
  /* border-radius: 4px; */
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  background: var(--surface-color);
  color: var(--primary-color);
}

/* ===========================
   MOBILE MODE (Drawer)
=========================== */
@media (max-width: 768px) {

  /* Contenedor del sidebar */
  .sidebar {
    position: fixed !important;
    top: 65px !important;        /* <-- debajo del header */
    left: 0;
    width: 60px !important;
    height: calc(100vh - 65px) !important;
    background: white;
    z-index: 2000;
    transition: width 0.25s ease;
  }

  /* Cuando está colapsado en móvil */
  .sidebar--collapsed {
    width: 60px !important;
  }

  /* Cuando NO está colapsado (expandido) en móvil */
  .sidebar:not(.sidebar--collapsed) {
    width: 220px !important;
  }

  /* Fondo oscuro detrás del sidebar cuando está expandido */
  body.sidebar-open::after {
    content: "";
    position: fixed;
    left: 0;
    top: 65px;
    width: 100%;
    height: calc(100vh - 65px);
    background: rgba(0,0,0,0.45);
    z-index: 1500;
    transition: opacity 0.25s ease;
  }

  /* Ítems */
  .nav-item {
    margin: 6px 8px;
  }

  .nav-link {
    justify-content: flex-start !important;
    padding: 12px 14px !important;
    min-height: 48px !important;
  }

  .sidebar--collapsed .nav-link {
    justify-content: center !important;
  }

  .nav-icon {
    font-size: 1.4rem !important;
    margin-right: 12px;
  }

  /* Ocultar texto SOLO si está colapsado */
  .sidebar--collapsed .nav-text {
    display: none !important;
  }

  .toggle-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>