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
  color: #666;
  font-weight: 500;
}

.breadcrumb-item--active .breadcrumb-text {
  color: #333;
  font-weight: 600;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}
</style>