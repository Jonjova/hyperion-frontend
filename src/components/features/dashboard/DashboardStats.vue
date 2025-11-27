<template>
  <div class="dashboard-stats">
    <div class="stats-grid">
      <div class="stat-card" v-for="stat in stats" :key="stat.title">
        <div class="stat-icon" :style="{ backgroundColor: stat.color }">
          {{ stat.icon }}
        </div>
        <div class="stat-content">
          <h3 class="stat-value">{{ stat.value }}</h3>
          <p class="stat-title">{{ stat.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardStats',
  props: {
    stats: {
      type: Array,
      default: () => [
        { title: 'Total Usuarios', value: '0', icon: '👥', color: '#1976d2' },
        { title: 'Total Categorías', value: '0', icon: '📂', color: '#388e3c' },
        { title: 'Roles Activos', value: '0', icon: '🔐', color: '#f57c00' },
        { title: 'Permisos', value: '0', icon: '⚡', color: '#7b1fa2' }
      ]
    }
  }
};
</script>

<style scoped>
.dashboard-stats {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #333;
}

.stat-title {
  margin: 0.5rem 0 0 0;
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}
</style>