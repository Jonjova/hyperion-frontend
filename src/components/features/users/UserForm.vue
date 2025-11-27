<template>
  <form @submit.prevent="handleSubmit" class="user-form">
    <div class="form-group">
      <label for="name" class="form-label">Nombre</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        class="form-input"
        required
        placeholder="Nombre completo"
      />
    </div>

    <div class="form-group">
      <label for="email" class="form-label">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        class="form-input"
        required
        placeholder="usuario@ejemplo.com"
      />
    </div>

    <div class="form-group">
      <label for="password" class="form-label" v-if="!user">Contraseña</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        class="form-input"
        :required="!user"
        placeholder="••••••••"
      />
    </div>

    <div class="form-actions">
      <BaseButton type="button" variant="secondary" @click="$emit('cancel')">
        Cancelar
      </BaseButton>
      <BaseButton type="submit" variant="primary">
        {{ user ? 'Actualizar' : 'Crear' }} Usuario
      </BaseButton>
    </div>
  </form>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  name: 'UserForm',
  components: {
    BaseButton
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: this.user?.name || '',
        email: this.user?.email || '',
        password: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.form);
    }
  }
};
</script>

<style scoped>
.user-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-input {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #1976d2;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}
</style>