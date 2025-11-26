<template>
  <div id="app">
    <PrimeToast />
    
    <div v-if="$store.getters['auth/isAuthenticated']">
      <PrimeToolbar class="p-mb-4">
        <template #left>
          <span class="p-text-bold">Mi App Vue 2</span>
        </template>
        <template #right>
          <PrimeButton
            label="Cerrar Sesión"
            icon="pi pi-sign-out"
            class="p-button-danger"
            @click="handleLogout"
          />
        </template>
      </PrimeToolbar>
      
      <div class="p-d-flex">
        <PrimeSidebar :visible.sync="sidebarVisible" :baseZIndex="1000">
          <PrimeMenu :model="menuItems" />
        </PrimeSidebar>
        
        <PrimeButton
          icon="pi pi-bars"
          @click="sidebarVisible = true"
          class="p-m-2"
          v-if="!sidebarVisible"
        />
        
        <div class="p-ml-2 p-mr-2" style="width: 100%">
          <router-view />
        </div>
      </div>
    </div>
    
    <router-view v-else />
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      sidebarVisible: true
    }
  },
  computed: {
    menuItems() {
      return [
        {
          label: 'Dashboard',
          icon: 'pi pi-home',
          command: () => {
            this.$router.push('/')
            this.sidebarVisible = false
          }
        },
        {
          label: 'Usuarios',
          icon: 'pi pi-users',
          command: () => {
            this.$router.push('/users')
            this.sidebarVisible = false
          }
        }
      ]
    }
  },
  methods: {
    async handleLogout() {
      try {
        await this.$store.dispatch('auth/logout')
        this.$router.push('/login')
        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Sesión cerrada correctamente',
          life: 3000
        })
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

body {
  margin: 0;
  padding: 0;
}
</style>