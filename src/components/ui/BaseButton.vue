<template>
  <button 
    :type="type" 
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="button-loader"></span>
    <slot v-else></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'danger', 'success'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClasses() {
      return [
        'base-button',
        `base-button--${this.variant}`,
        `base-button--${this.size}`,
        {
          'base-button--disabled': this.disabled,
          'base-button--loading': this.loading
        }
      ];
    }
  },
  emits: ['click']
};
</script>

<style scoped>
.base-button {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.base-button--small {
  padding: 8px 16px;
  font-size: 14px;
}

.base-button--medium {
  padding: 12px 24px;
  font-size: 16px;
}

.base-button--large {
  padding: 16px 32px;
  font-size: 18px;
}

.base-button--primary {
  background-color: #27272a;
  color: white;
}

.base-button--primary:hover:not(.base-button--disabled) {
  background-color: #313135;
}

.base-button--secondary {
  background-color: #78787e54;
  color: rgb(247, 244, 244);
}

.base-button--secondary:hover:not(.base-button--disabled) {
  background-color: #8e8e929d;
}

.base-button--danger {
  background-color: #64171f;
  color: white;
}

.base-button--danger:hover:not(.base-button--disabled) {
  background-color: #64171f;
}

.base-button--success {
  background-color: #22a853;
  color: white;
}

.base-button--success:hover:not(.base-button--disabled) {
  background-color: #237e38;
}

.base-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.base-button--loading {
  cursor: wait;
}

.button-loader {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>