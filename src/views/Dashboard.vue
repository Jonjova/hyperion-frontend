<template>
  <div class="dashboard-container p-p-4">
    <h1>Dashboard</h1>
    <p>Bienvenido, {{ user?.name }}</p>
    
    <div class="p-grid">
      <div class="p-col-12 p-md-6 p-lg-3">
        <PrimeCard>
          <template #title>
            <i class="pi pi-users p-mr-2"></i>
            Usuarios
          </template>
          <template #content>
            <h2>{{ usersCount }}</h2>
            <p>Total de usuarios</p>
          </template>
        </PrimeCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardPage',
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('users', ['users']),
    usersCount() {
      return this.users.length
    }
  },
  async mounted() {
    await this.$store.dispatch('users/fetchUsers')
  }
}
</script>