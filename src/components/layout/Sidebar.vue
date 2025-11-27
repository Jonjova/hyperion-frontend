<template>
  <aside class="sidebar" :class="{ 'sidebar--collapsed': collapsed }">
     <!-- Botón de toggle en la parte superior -->
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
            :class="{ 'nav-link--active': $route.path.startsWith(item.to) }"
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
  emits: ['toggle']
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease;
  height: 100vh;
  position: sticky;
  top: 0;
}

.sidebar--collapsed {
  width: 50px;
}

.sidebar-nav {
  flex: 1;
  padding: 8px 0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 2px 8px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  text-decoration: none;
  color: #666;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.nav-link:hover {
  background: #dad6d6;
  color: #333;
}

.nav-link--active:hover {
  background: linear-gradient(to right, #000000da, #434343);
  color: white;
  font-weight: 500;
}

.nav-link--active {
  background: linear-gradient(to right, #000000da, #434343);
  color: white;
  font-weight: 500;
}

.nav-icon {
  margin-right: 12px;
  font-size: 1rem;
  min-width: 16px;
  text-align: center;
}

.nav-text {
  white-space: nowrap;
  transition: opacity 0.2s ease;
}

.sidebar--collapsed .nav-text {
  opacity: 0;
  width: 0;
}

.sidebar-footer {
  padding: 12px;
  border-top: 1px solid #e0e0e0;
}

.toggle-btn {
  width: 100%;
  background: none;
  border: 1px solid #e0e0e0;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  background: #f5f5f5;
  color: #333;
}
</style>