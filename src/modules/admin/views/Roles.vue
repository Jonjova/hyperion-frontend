<template>
  <div class="roles">
    <AppHeader title="Gestión de Roles" />
    
    <div class="admin-layout">
      <Sidebar 
        :collapsed="sidebarCollapsed" 
        @toggle="sidebarCollapsed = !sidebarCollapsed" 
      />
      
      <main class="main-content">
        <Breadcrumb :items="breadcrumbItems" />
        
        <div class="content-area">
          <div class="page-header">
            <h1>Roles y Permisos</h1>
            <BaseButton 
              v-if="$can('role.manage')"
              variant="primary" 
              @click="showRoleModal = true"
            >
              Nuevo Rol
            </BaseButton>
          </div>

          <div class="roles-grid">
            <div class="roles-list">
              <h2>Roles del Sistema</h2>
              <div class="role-cards">
                <div 
                  v-for="role in roles" 
                  :key="role.id"
                  class="role-card"
                  :class="{ 'role-card--active': selectedRole?.id === role.id }"
                  @click="selectRole(role)"
                >
                  <div class="role-header">
                    <h3 class="role-name">{{ role.name }}</h3>
                    <span class="role-permissions-count">
                      {{ role.permissions_count }} permisos
                    </span>
                  </div>
                  <p class="role-description">{{ role.description || 'Sin descripción' }}</p>
                </div>
              </div>
            </div>

            <div class="role-permissions" v-if="selectedRole">
              <h2>Permisos del Rol: {{ selectedRole.name }}</h2>
              <div class="permissions-list">
                <div 
                  v-for="permission in allPermissions" 
                  :key="permission.id"
                  class="permission-item"
                >
                  <label>
                    <input
                      type="checkbox"
                      :value="permission.id"
                      v-model="selectedPermissions"
                    />
                    {{ permission.name }}
                  </label>
                </div>
              </div>
              
              <div class="role-actions">
                <BaseButton 
                  variant="primary" 
                  @click="updateRolePermissions"
                  :loading="updatingPermissions"
                >
                  Guardar Permisos
                </BaseButton>
              </div>
            </div>

            <div v-else class="no-role-selected">
              <p>Selecciona un rol para gestionar sus permisos</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppHeader from '@/components/layout/AppHeader.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import Breadcrumb from '@/components/layout/Breadcrumb.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'AdminRoles',
  components: {
    AppHeader,
    Sidebar,
    Breadcrumb,
    BaseButton
  },
  data() {
    return {
      sidebarCollapsed: false,
      showRoleModal: false,
      selectedRole: null,
      selectedPermissions: [],
      updatingPermissions: false,
      roles: [
        { id: 1, name: 'admin', description: 'Administrador del sistema', permissions_count: 25 },
        { id: 2, name: 'manager', description: 'Gerente', permissions_count: 15 },
        { id: 3, name: 'user', description: 'Usuario estándar', permissions_count: 8 }
      ],
      allPermissions: [
        { id: 1, name: 'user.read' },
        { id: 2, name: 'user.create' },
        { id: 3, name: 'user.update' },
        { id: 4, name: 'user.delete' },
        { id: 5, name: 'category.read' },
        { id: 6, name: 'category.create' },
        { id: 7, name: 'category.update' },
        { id: 8, name: 'category.delete' }
      ]
    };
  },
  computed: {
    ...mapGetters('permissions', ['userPermissionsData']),
    breadcrumbItems() {
      return [
        { text: 'Dashboard', to: '/dashboard' },
        { text: 'Roles', to: '/admin/roles' }
      ];
    }
  },
  methods: {
    selectRole(role) {
      this.selectedRole = role;
      // Aquí cargarías los permisos actuales del rol desde la API
      this.selectedPermissions = [1, 2, 5, 6]; // Ejemplo
    },
    
    async updateRolePermissions() {
      if (!this.selectedRole) return;
      
      this.updatingPermissions = true;
      
      try {
        // Aquí llamarías a la API para actualizar los permisos del rol
        // await this.$store.dispatch('permissions/updateRolePermissions', {
        //   roleId: this.selectedRole.id,
        //   permissions: this.selectedPermissions
        // });
        
        this.$notify({
          type: 'success',
          message: 'Permisos actualizados correctamente'
        });
      } catch (error) {
        this.$notify({
          type: 'error',
          message: 'Error al actualizar permisos'
        });
      } finally {
        this.updatingPermissions = false;
      }
    }
  },
  mounted() {
    if (!this.$can('role.manage')) {
      this.$router.push('/unauthorized');
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
  background-color: #f5f5f5;
}

.content-area {
  padding: 24px;
  background: var(--background-color);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0;
  color: #333;
  font-size: 2rem;
}

.roles-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.roles-list h2,
.role-permissions h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}

.role-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.role-card {
  background: white;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.role-card:hover {
  border-color: #1976d2;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.role-card--active {
  border-color: #1976d2;
  background-color: #e3f2fd;
}

.role-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.role-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  text-transform: capitalize;
}

.role-permissions-count {
  background: #1976d2;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.role-description {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.role-permissions {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.permissions-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  max-height: 400px;
  overflow-y: auto;
}

.permission-item {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #fafafa;
}

.permission-item label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
}

.permission-item input {
  margin-right: 0.5rem;
}

.role-actions {
  display: flex;
  justify-content: flex-end;
}

.no-role-selected {
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.1rem;
}
</style>