<template>
  <div class="app-loader" v-if="loading">
    <div class="loader-content">
      <div class="spinner"></div>
      <p>Cargando aplicación...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLoader',
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.app-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader-content {
  text-align: center;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>