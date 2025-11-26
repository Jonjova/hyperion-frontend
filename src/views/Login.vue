<template>
  <div class="login-container p-fluid p-d-flex p-ai-center p-jc-center" style="height: 100vh;">
    <PrimeCard class="login-card" style="width: 400px;">
      <template #title>
        <div class="p-text-center">
          <i class="pi pi-user" style="font-size: 2rem"></i>
          <h2>Iniciar Sesión</h2>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="handleLogin">
          <div class="p-field">
            <label for="email">Email</label>
            <PrimeInputText
              id="email"
              v-model="form.email"
              type="email"
              class="p-mt-2"
              placeholder="Ingresa tu email"
              :class="{'p-invalid': errors.email}"
              style="width: 100%"
            />
            <small class="p-error" v-if="errors.email">{{ errors.email[0] }}</small>
          </div>
          
          <div class="p-field p-mt-3">
            <label for="password">Contraseña</label>
            <PrimePassword
              id="password"
              v-model="form.password"
              :feedback="false"
              class="p-mt-2"
              placeholder="Ingresa tu contraseña"
              :class="{'p-invalid': errors.password}"
              style="width: 100%"
              toggleMask
            />
            <small class="p-error" v-if="errors.password">{{ errors.password[0] }}</small>
          </div>
          
          <PrimeButton
            type="submit"
            label="Iniciar Sesión"
            icon="pi pi-sign-in"
            class="p-mt-3"
            style="width: 100%"
            :loading="loading"
            :disabled="loading"
          />
        </form>
      </template>
    </PrimeCard>
    
    <PrimeToast />
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: {},
      loading: false
    }
  },
  onMounted() {
    if (this.$store.getters['auth/isAuthenticated']) {
      this.$router.push('/')
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.errors = {}
      
      try {
        await this.$store.dispatch('auth/login', this.form)
        this.$toast.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Login exitoso',
          life: 3000
        })
        this.$router.push('/')
      } catch (error) {
        if (error.errors) {
          this.errors = error.errors
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Error al iniciar sesión',
            life: 5000
          })
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}
</style>