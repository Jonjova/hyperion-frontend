<template>
  <div class="base-table">
    <table :class="tableClasses">
      <thead>
        <tr>
          <th 
            v-for="column in columns" 
            :key="column.key"
            :class="getHeaderClass(column)"
          >
            {{ column.label }}
          </th>
          <th v-if="$slots.actions">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="item.id || index">
          <td v-for="column in columns" :key="column.key">
            <slot :name="`cell-${column.key}`" :item="item" :value="item[column.key]">
              {{ item[column.key] }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="actions-cell">
            <slot name="actions" :item="item" :index="index"></slot>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div v-if="data.length === 0" class="empty-state">
      <slot name="empty">
        No hay datos disponibles
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    striped: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tableClasses() {
      return [
        'table',
        {
          'table-striped': this.striped,
          'table-hover': this.hover
        }
      ];
    }
  },
  methods: {
    getHeaderClass(column) {
      return [
        `column-${column.key}`,
        {
          'text-left': column.align === 'left',
          'text-center': column.align === 'center',
          'text-right': column.align === 'right'
        }
      ];
    }
  }
};
</script>

<style scoped>
.base-table {
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.table th,
.table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.table th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
}

.table-striped tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

.actions-cell {
  white-space: nowrap;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-top: 16px;
}

.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
</style>