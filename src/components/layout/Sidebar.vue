<template>
  <aside class="sidebar" :class="{ 'sidebar--collapsed': collapsed }">
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li v-for="item in navigation" :key="item.to" class="nav-item">
          <router-link 
            :to="item.to" 
            class="nav-link"
            :class="{ 'nav-link--active': $route.path === item.to }"
          >
            <i class="nav-icon" v-if="item.icon" :class="item.icon" :style="{ fontSize: '1rem' }"></i>
            <span class="nav-text">{{ item.text }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    
    <div class="sidebar-footer">
      <BaseButton 
        variant="secondary" 
        size="small" 
        @click="$emit('toggle')"
        class="toggle-btn"
      >
        {{ collapsed ? '›' : '‹' }}
      </BaseButton>
    </div>
  </aside>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'AppSidebar',
  components: {
    BaseButton
  },
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
  width: 250px;
  background-color: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  height: 100vh;
  position: sticky;
  top: 0;
}

.sidebar--collapsed {
  width: 60px;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.nav-link:hover {
  background-color: #e9ecef;
}

.nav-link--active {
  background-color: #bdc0c0;
  border-left-color: #1976d225;
  color: #090f14;
  font-weight: 500;
}

.nav-icon {
  margin-right: 12px;
  font-size: 1.2rem;
  min-width: 24px;
  text-align: center;
}

.nav-text {
  white-space: nowrap;
  transition: opacity 0.3s ease;
}

.sidebar--collapsed .nav-text {
  opacity: 0;
  width: 0;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #e0e0e0;
}

.toggle-btn {
  width: 100%;
}
</style>