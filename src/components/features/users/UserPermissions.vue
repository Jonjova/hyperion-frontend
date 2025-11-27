<template>
  <div class="user-permissions">
    <h3>Gestión de Permisos</h3>
    
    <!-- Roles del usuario -->
    <div class="permissions-section">
      <h4>Roles</h4>
      <div v-for="role in permissionsData.roles" :key="role.id" class="permission-item">
        <label>
          <input
            type="checkbox"
            :value="role.id"
            v-model="selectedRoles"
            @change="updateRoles"
          />
          {{ role.name }}
          <span class="permissions-count">({{ role.permissions_count }} permisos)</span>
        </label>
      </div>
    </div>

    <!-- Permisos directos -->
    <div class="permissions-section">
      <h4>Permisos Directos</h4>
      <div v-for="permission in permissionsData.permissions" :key="permission.id" class="permission-item">
        <label>
          <input
            type="checkbox"
            :value="permission.id"
            v-model="selectedPermissions"
            :disabled="isInherited(permission.id)"
            @change="updatePermissions"
          />
          {{ permission.name }}
          <span v-if="isInherited(permission.id)" class="inherited-badge">Heredado</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserPermissions',
  props: {
    userId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      selectedRoles: [],
      selectedPermissions: []
    };
  },
  computed: {
    ...mapGetters('permissions', ['userPermissionsData']),
    
    permissionsData() {
      return this.userPermissionsData;
    }
  },
  watch: {
    permissionsData: {
      immediate: true,
      handler(data) {
        this.selectedRoles = [...data.userRoles];
        this.selectedPermissions = [...data.userDirectPermissions];
      }
    }
  },
  methods: {
    isInherited(permissionId) {
      return this.permissionsData.inheritedPermissions.includes(permissionId);
    },
    
    async updateRoles() {
      try {
        await this.$store.dispatch('permissions/assignUserRoles', {
          userId: this.userId,
          roles: this.selectedRoles
        });
        this.$notify({
          type: 'success',
          message: 'Roles actualizados correctamente'
        });
      } catch (error) {
        this.$notify({
          type: 'error',
          message: 'Error al actualizar roles'
        });
      }
    },
    
    async updatePermissions() {
      try {
        await this.$store.dispatch('permissions/assignUserPermissions', {
          userId: this.userId,
          permissions: this.selectedPermissions
        });
        this.$notify({
          type: 'success',
          message: 'Permisos actualizados correctamente'
        });
      } catch (error) {
        this.$notify({
          type: 'error',
          message: 'Error al actualizar permisos'
        });
      }
    }
  }
};
</script>

<style scoped>
.user-permissions {
  padding: 1rem;
}

.permissions-section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.permissions-section h4 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}

.permission-item {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  background-color: #fafafa;
}

.permission-item label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
}

.permission-item input {
  margin-right: 0.5rem;
}

.permissions-count {
  font-size: 0.8rem;
  color: #666;
  margin-left: 0.5rem;
}

.inherited-badge {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}
</style>