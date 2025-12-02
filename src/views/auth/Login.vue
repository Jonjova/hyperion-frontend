<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Iniciar Sesión</h1>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="form-input"
            :class="{ 'form-input--error': errors.email }"
            placeholder="usuario@ejemplo.com"
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Contraseña</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-input"
            :class="{ 'form-input--error': errors.password }"
            placeholder="••••••••"
          />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <BaseButton 
          type="submit" 
          variant="primary" 
          size="large" 
          :loading="loading"
          class="login-button"
        >
          Iniciar Sesión
        </BaseButton>

        <div v-if="error" class="alert alert-error">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';
import { emailValidator, requiredValidator } from '@/utils/validators';

export default {
  name: 'AuthLogin',
  components: {
    BaseButton
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: {},
      loading: false,
      error: ''
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      
      if (!requiredValidator(this.form.email)) {
        this.errors.email = 'El email es requerido';
      } else if (!emailValidator(this.form.email)) {
        this.errors.email = 'El email no es válido';
      }
      
      if (!requiredValidator(this.form.password)) {
        this.errors.password = 'La contraseña es requerida';
      }
      
      return Object.keys(this.errors).length === 0;
    },
    
    async handleLogin() {
      if (!this.validateForm()) return;
      
      this.loading = true;
      this.error = '';
      
      try {
        // Hacer login - el store ya guarda en localStorage
        const response = await this.$store.dispatch('auth/login', this.form);
        
        // Obtener el usuario de la respuesta
        const user = response.data.user;
        
        // Debug: verificar que el usuario se guardó
        console.log('Usuario obtenido del login:', user);
        console.log('Token guardado en localStorage:', localStorage.getItem('token'));
        console.log('Usuario guardado en localStorage:', localStorage.getItem('user'));
        
        // Redirigir al dashboard
        this.$router.push('/dashboard');
      } catch (error) {
        console.error('Error de inicio de sesión:', error);
        
        // Manejar diferentes tipos de errores
        if (error.response) {
          // El servidor respondió con un error
          if (error.response.status === 401) {
            this.error = 'Credenciales incorrectas';
          } else if (error.response.status === 422) {
            this.error = 'Datos de formulario inválidos';
          } else if (error.response.status === 500) {
            this.error = 'Error del servidor. Intente más tarde.';
          } else {
            this.error = error.response.data?.error || 
                       error.response.data?.message || 
                       'Error al iniciar sesión';
          }
        } else if (error.request) {
          // La petición fue hecha pero no hubo respuesta
          this.error = 'No se pudo conectar con el servidor. Verifique su conexión.';
          console.warn('Backend no disponible. Usando datos mock...');
          
          // Opcional: Usar datos mock para desarrollo
          await this.mockLogin();
        } else {
          // Error al configurar la petición
          this.error = 'Error de configuración: ' + error.message;
        }
      } finally {
        this.loading = false;
      }
    },
    
    // Método mock para desarrollo sin backend
    async mockLogin() {
      try {
        const mockUser = {
          id: 1,
          name: 'Usuario Demo',
          email: this.form.email || 'demo@example.com',
          roles: ['admin']
        };
        
        const mockToken = 'mock-jwt-token-' + Date.now();
        
        // Guardar en localStorage
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Actualizar store
        this.$store.commit('auth/SET_TOKEN', mockToken);
        this.$store.commit('auth/SET_USER', mockUser);
        
        console.log('Login mock exitoso:', mockUser);
        
        // Cargar permisos mock
        await this.$store.dispatch('permissions/loadUserPermissions', mockUser.id, { root: true });
        
        // Redirigir
        this.$router.push('/dashboard');
      } catch (mockError) {
        console.error('Error en mock login:', mockError);
        this.error = 'Error en modo desarrollo. Intente con credenciales demo.';
      }
    }
  },
  created() {
    // Verificar si ya está autenticado
    if (this.$store.getters['auth/isAuthenticated']) {
      this.$router.push('/dashboard');
    }
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #979bad 0%, #a6a6af 100%);
  padding: 20px;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}

.login-form {
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

.form-input--error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.login-button {
  width: 100%;
}

.alert {
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  font-weight: 500;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>