<template>
  <nav class="breadcrumb" >
    <ol class="breadcrumb-list" :style="{ paddingLeft: '24px' }">
      <li 
        v-for="(item, index) in items" 
        :key="index"
        class="breadcrumb-item"
        :class="{ 'breadcrumb-item--active': index === items.length - 1 }"
      >
        <router-link 
          v-if="index !== items.length - 1 && item.to" 
          :to="item.to"
          class="breadcrumb-link"
        >
          {{ item.text }}
        </router-link>
        <span v-else class="breadcrumb-text">
          {{ item.text }}
        </span>
        <span 
          v-if="index < items.length - 1" 
          class="breadcrumb-separator"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'AppBreadcrumb',
  props: {
    items: {
      type: Array,
      default: () => [],
      validator: (items) => items.every(item => 
        typeof item.text === 'string' && 
        (item.to === undefined || typeof item.to === 'string')
      )
    }
  }
};
</script>

<style scoped>
.breadcrumb {
  padding: 16px 0;
  /* padding-left: 58px; */
  /* background: var(--background-color); */
}

.breadcrumb-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-text {
  color: var(--text-color);
  font-weight: 500;
}

.breadcrumb-item--active .breadcrumb-text {
  color: var(--primary-color-dark);
  font-weight: 600;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}
/* añade modo movil */
@media (max-width: 768px) {
  .breadcrumb {
    padding-left: 51px;
  }

  .breadcrumb-item {
    font-size: 0.875rem;
  }

  .breadcrumb-separator {
    display: none;
  }
}

@media (max-width: 768px) {
  .breadcrumb {
    padding-left: 51px;
  }

  .breadcrumb-item {
    font-size: 0.875rem;
    position: relative;
  }

  .breadcrumb-separator {
    display: none;
  }

  /* Flecha chevron */
  .breadcrumb-item:not(:last-child)::after {
    content: "\e901";
    font-family: 'primeicons';
    margin: 0 4px;
    color: var(--text-color);
    font-size: 0.65em;
  }
}
</style>