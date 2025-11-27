<template>
  <transition name="modal">
    <div v-if="value" class="modal-overlay" @click.self="close">
      <div class="modal-container" :class="modalSize">
        <div class="modal-header">
          <h3 v-if="title" class="modal-title">{{ title }}</h3>
          <button class="modal-close" @click="close">&times;</button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    value: { // Cambiado de 'show' a 'value' para v-model
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  computed: {
    modalSize() {
      return `modal--${this.size}`;
    }
  },
  methods: {
    close() {
      if (this.closeOnOverlay) {
        this.$emit('input', false); // Cambiado para v-model
      }
    }
  },
  emits: ['input'] // Actualizado
};
</script>