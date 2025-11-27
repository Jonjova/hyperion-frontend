<template>
  <div class="dashboard">
    <AppHeader title="Dashboard" />
    
    <div class="dashboard-layout">
      <Sidebar 
        :collapsed="sidebarCollapsed" 
        @toggle="sidebarCollapsed = !sidebarCollapsed" 
      />
      
      <main class="main-content">
        <Breadcrumb :items="breadcrumbItems" />
        
        <div class="content-area">
          <DashboardStats :stats="stats" />
          
          <div class="dashboard-grid">
            <div class="recent-activity">
              <h2>Actividad Reciente</h2>
              <div class="activity-list">
                <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
                  <span class="activity-icon">{{ activity.icon }}</span>
                  <div class="activity-content">
                    <p class="activity-text">{{ activity.text }}</p>
                    <span class="activity-time">{{ activity.time }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="quick-actions">
              <h2>Acciones Rápidas</h2>
              <div class="actions-grid">
                <BaseButton 
                  v-for="action in quickActions" 
                  :key="action.label"
                  :variant="action.variant"
                  @click="handleAction(action)"
                  class="action-button"
                >
                  {{ action.label }}
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import Breadcrumb from '@/components/layout/Breadcrumb.vue';
import DashboardStats from '@/components/features/dashboard/DashboardStats.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'AppDashboard',
  components: {
    AppHeader,
    Sidebar,
    Breadcrumb,
    DashboardStats,
    BaseButton
  },
  data() {
    return {
      sidebarCollapsed: false,
      stats: [
        { title: 'Total Usuarios', value: '150', icon: '👥', color: '#1976d2' },
        { title: 'Total Categorías', value: '45', icon: '📂', color: '#388e3c' },
        { title: 'Roles Activos', value: '8', icon: '🔐', color: '#f57c00' },
        { title: 'Permisos', value: '120', icon: '⚡', color: '#7b1fa2' }
      ],
      recentActivities: [
        { id: 1, icon: '👤', text: 'Nuevo usuario registrado', time: 'Hace 5 min' },
        { id: 2, icon: '📝', text: 'Categoría actualizada', time: 'Hace 15 min' },
        { id: 3, icon: '🔐', text: 'Permisos modificados', time: 'Hace 30 min' }
      ],
      quickActions: [
        { label: 'Gestionar Usuarios', variant: 'primary', route: '/admin/users' },
        { label: 'Ver Categorías', variant: 'secondary', route: '/categorias' },
        { label: 'Gestionar Roles', variant: 'success', route: '/admin/roles' }
      ]
    };
  },
  computed: {
    breadcrumbItems() {
      return [
        { text: 'Dashboard', to: '/dashboard' }
      ];
    }
  },
  methods: {
    handleAction(action) {
      this.$router.push(action.route).catch(err => {
        // Ignorar error de navegación redundante
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });
    }
  },
  mounted() {
    if (!this.$auth.isAuthenticated) {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: calc(100vh - 64px);
}

.main-content {
  flex: 1;
  padding: 0;
  background-color: #f5f5f5;
}

.content-area {
  padding: 24px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

.recent-activity,
.quick-actions {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recent-activity h2,
.quick-actions h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.25rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.activity-item:hover {
  background-color: #f9f9f9;
}

.activity-icon {
  font-size: 1.2rem;
  margin-top: 2px;
}

.activity-content {
  flex: 1;
}

.activity-text {
  margin: 0 0 0.25rem 0;
  font-weight: 500;
}

.activity-time {
  font-size: 0.875rem;
  color: #666;
}

.actions-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-button {
  width: 100%;
  justify-content: flex-start;
  padding-left: 1rem;
}
</style>