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
      error: '',
      isRedirecting: false // ← Controlar redirecciones
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
      if (this.isRedirecting) return;
      
      if (!this.validateForm()) return;
      
      this.loading = true;
      this.error = '';
      this.isRedirecting = true;
      
      try {
        // Hacer login
        const response = await this.$store.dispatch('auth/login', this.form);
        
        // Redirigir usando replace (no push)
        await this.$router.replace('/dashboard');
        
      } catch (error) {
        console.error('Error de inicio de sesión:', error);
        
        if (error.response) {
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
          this.error = 'No se pudo conectar con el servidor.';
          
          // Usar login mock de manera controlada
          await this.useMockAuth();
          
        } else {
          this.error = 'Error de configuración: ' + error.message;
        }
      } finally {
        this.loading = false;
        this.isRedirecting = false;
      }
    },
    
    async useMockAuth() {
      try {
        const mockCredentials = {
          email: this.form.email || 'demo@example.com',
          password: this.form.password || 'demo123'
        };
        
        // Simular la misma estructura que el login real
        const mockResponse = {
          data: {
            token: 'mock-jwt-token-' + Date.now(),
            user: {
              id: 1,
              name: 'Usuario Demo',
              email: mockCredentials.email,
              roles: ['admin']
            }
          }
        };
        
        // Usar la misma lógica del store
        await this.$store.dispatch('auth/login', {
          email: mockCredentials.email,
          password: mockCredentials.password
        });
        
        // Redirigir
        await this.$router.replace('/dashboard');
        
      } catch (error) {
        console.error('Error en mock auth:', error);
        this.error = 'No se pudo iniciar sesión en modo desarrollo.';
        this.isRedirecting = false;
      }
    }
  },

};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #050505da, #4d4c4c);
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
  border: none;
  border-bottom: 2px solid #e0e0e0;
  border-radius: 0;
  background: transparent;
}

.form-input:focus {
  outline: none;
  border-color: #0e0f0f;
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