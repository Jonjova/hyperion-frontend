<template>
  <div class="users">
    <AppHeader title="Gestión de Usuarios" />
    
    <div class="admin-layout">
      <AppSidebar 
        :collapsed="sidebarCollapsed" 
        @toggle="sidebarCollapsed = !sidebarCollapsed" 
      />
      
      <main class="main-content">
        <AppBreadcrumb :items="breadcrumbItems" />
        
        <div class="content-area">
          <div class="page-header">
            <h1>Usuarios</h1>
            <BaseButton 
              v-if="$can('user.create')"
              variant="primary" 
              @click="showCreateModal = true"
            >
              Nuevo Usuario
            </BaseButton>
          </div>

          <BaseTable
            :data="users"
            :columns="columns"
            striped
            hover
          >

           <template #cell-roles="slotProps">
              <div class="roles-tags">
                <span 
                  v-for="role in slotProps.item.roles" 
                  :key="role.id || role"
                  class="role-tag"
                >
                  {{ role.name || role }}
                </span>
                <span v-if="!slotProps.item.roles || slotProps.item.roles.length === 0" class="no-roles">
                  Sin roles
                </span>
              </div>
            </template>
            <template #cell-actions="slotProps">
              
              <div class="table-actions">
                <BaseButton 
                  size="small" 
                  variant="secondary"
                  @click="viewUser(slotProps.item)"
                >
                  Ver
                </BaseButton>
                <BaseButton 
                  v-if="$can('user.update')"
                  size="small" 
                  variant="secondary"
                  @click="editUser(slotProps.item)"
                >
                  Editar
                </BaseButton>
                <BaseButton 
                  v-if="$can('user.delete')"
                  size="small" 
                  variant="danger"
                  @click="deleteUser(slotProps.item)"
                >
                  Eliminar
                </BaseButton>
              </div>
            </template>

            <template #empty>
              <div class="empty-state">
                <p>No hay usuarios registrados</p>
                <BaseButton 
                  v-if="$can('user.create')"
                  variant="primary" 
                  @click="showCreateModal = true"
                >
                  Crear primer usuario
                </BaseButton>
              </div>
            </template>
          </BaseTable>
        </div>
      </main>
    </div>

    <!-- Modal para crear/editar usuario -->
    <BaseModal 
      v-model="showCreateModal"
      :title="isEditing ? 'Editar Usuario' : 'Nuevo Usuario'"
      size="medium"
    >
      <UserForm 
        :user="currentUser"
        @submit="handleUserSubmit"
        @cancel="closeModal"
      />
    </BaseModal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppSidebar from '@/components/layout/Sidebar.vue'; // Nombre actualizado
import AppBreadcrumb from '@/components/layout/Breadcrumb.vue'; // Nombre actualizado
import BaseTable from '@/components/ui/BaseTable.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import UserForm from '@/components/features/users/UserForm.vue';

export default {
  name: 'AdminUsers', // NOMBRE CORREGIDO
  components: {
    AppHeader,
    AppSidebar: AppSidebar, // Alias para el nombre actualizado
    AppBreadcrumb: AppBreadcrumb, // Alias para el nombre actualizado
    BaseTable,
    BaseButton,
    BaseModal,
    UserForm
  },
  data() {
    return {
      sidebarCollapsed: false,
      showCreateModal: false,
      isEditing: false,
      currentUser: null,
      columns: [
        { key: 'id', label: 'ID', align: 'center' },
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Email' },
        { key: 'roles', label: 'Roles', align: 'center' }
      ]
    };
  },
  computed: {
    ...mapGetters('users', ['users']),
    breadcrumbItems() {
      return [
        { text: 'Dashboard', to: '/dashboard' },
        { text: 'Usuarios', to: '/admin/users' }
      ];
    }
  },
  async mounted() {
    await this.loadUsers();
  },
  methods: {
    ...mapActions('users', ['fetchUsers', 'deleteUser']),
    
    async loadUsers() {
      try {
        await this.fetchUsers();
      } catch (error) {
        this.$notify({
          type: 'error',
          message: 'Error al cargar usuarios'
        });
      }
    },
    
    viewUser(user) {
      this.$router.push(`/admin/users/${user.id}`);
    },
    
    editUser(user) {
      this.currentUser = user;
      this.isEditing = true;
      this.showCreateModal = true;
    },
    
    async deleteUser(user) {
      if (!confirm(`¿Estás seguro de eliminar al usuario ${user.name}?`)) return;
      
      try {
        await this.$store.dispatch('users/deleteUser', user.id);
        this.$notify({
          type: 'success',
          message: 'Usuario eliminado correctamente'
        });
      } catch (error) {
        this.$notify({
          type: 'error',
          message: 'Error al eliminar usuario'
        });
      }
    },
    
    handleUserSubmit(userData) {
      if (this.isEditing) {
        this.updateUser(userData);
      } else {
        this.createUser(userData);
      }
    },
    
    async createUser(userData) {
      try {
        await this.$store.dispatch('users/createUser', userData);
        this.$notify({
          type: 'success',
          message: 'Usuario creado correctamente'
        });
        this.closeModal();
      } catch (error) {
        this.$notify({
          type: 'error',
          message: 'Error al crear usuario'
        });
      }
    },
    
    async updateUser(userData) {
      try {
        await this.$store.dispatch('users/updateUser', {
          userId: this.currentUser.id,
          userData
        });
        this.$notify({
          type: 'success',
          message: 'Usuario actualizado correctamente'
        });
        this.closeModal();
      } catch (error) {
        this.$notify({
          type: 'error',
          message: 'Error al actualizar usuario'
        });
      }
    },
    
    closeModal() {
      this.showCreateModal = false;
      this.isEditing = false;
      this.currentUser = null;
    }
  }
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: calc(100vh - 64px);
}

.main-content {
  flex: 1;
  padding: 0;
  background-color: #f8f9fa;
}

.content-area {
  padding: 20px;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;
  color: #333;
  font-size: 1.75rem;
  font-weight: 600;
}

/* Roles Tags Minimalistas */
.roles-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.role-tag {
  background-color: #f8f9fa;
  color: #495057;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 400;
  border: 1px solid #e9ecef;
}

.no-roles {
  color: #6c757d;
  font-style: italic;
  font-size: 0.8rem;
}

/* Table Actions Minimalistas */
.table-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive Design */
@media (min-width: 768px) {
  .page-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 767px) {
  .content-area {
    padding: 16px;
  }
  
  .table-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 480px) {
  .table-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .table-actions .base-button {
    width: 100%;
    justify-content: center;
  }
}
</style>