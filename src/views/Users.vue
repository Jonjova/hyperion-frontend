<template>
  <div class="users-container">
    <PrimeCard>
      <template #title>
        <div class="p-d-flex p-ai-center p-jc-between">
          <span>
            <i class="pi pi-users p-mr-2"></i>
            Gestión de Usuarios
          </span>
          <PrimeButton
            label="Actualizar"
            icon="pi pi-refresh"
            @click="fetchUsers"
            :loading="loading"
          />
        </div>
      </template>
      <template #content>
        <div v-if="loading" class="p-d-flex p-jc-center p-ai-center p-p-5">
          <PrimeProgressSpinner />
        </div>
        
        <PrimeDataTable
          v-else
          :value="users"
          :paginator="true"
          :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5,10,20]"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuarios"
          responsiveLayout="scroll"
        >
          <PrimeColumn field="id" header="ID" :sortable="true"></PrimeColumn>
          <PrimeColumn field="name" header="Nombre" :sortable="true"></PrimeColumn>
          <PrimeColumn field="email" header="Email" :sortable="true"></PrimeColumn>
          <PrimeColumn field="created_at" header="Fecha Creación" :sortable="true">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.created_at) }}
            </template>
          </PrimeColumn>
        </PrimeDataTable>
      </template>
    </PrimeCard>
    
    <PrimeToast />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UsersPage',
  computed: {
    ...mapGetters('users', ['users', 'isLoading']),
    loading() {
      return this.isLoading
    }
  },
  methods: {
    ...mapActions('users', ['fetchUsers']),
    
    formatDate(dateString) {
      if (!dateString) return ''
      return new Date(dateString).toLocaleDateString('es-ES')
    }
  },
  async mounted() {
    await this.fetchUsers()
  }
}
</script>

<style scoped>
.users-container {
  padding: 2rem;
}
</style>