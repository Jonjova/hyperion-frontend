<template>
  <div class="base-table">
    <div class="table-container">
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
            <th v-if="$slots.actions" class="actions-header">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="item.id || index">
            <td 
              v-for="column in columns" 
              :key="column.key"
              :data-label="column.label"
            >
              <slot :name="`cell-${column.key}`" :item="item" :value="item[column.key]">
                {{ item[column.key] }}
              </slot>
            </td>
            <td v-if="$slots.actions" class="actions-cell" data-label="Acciones">
              <slot name="actions" :item="item" :index="index"></slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
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
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  background: var(--primary-color);
  box-shadow: var(--primary-color);
}

.table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Minimum width for desktop */
}

.table th,
.table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--primary-color);
  font-size: 0.875rem;
}

.table th {
  background-color: var(--border-color);
  font-weight: 500;
  color: var(--text-color);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-striped tbody tr:nth-child(even) {
  background-color: var(--surface-hover);
}

.table-hover tbody tr:hover {
  background-color: var(--surface-hover);
}

.actions-cell {
  white-space: nowrap;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: #666;
  background-color: #fafafa;
  border-radius: 8px;
  margin-top: 16px;
}

.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* Responsive Design */
@media (max-width: 768px) {
  .table-container {
    min-width: unset;
    border: 1px solid #f0f0f0;
  }
  
  .table {
    min-width: unset;
    width: 100%;
  }
  
  .table thead {
    display: none;
  }
  
  .table tbody tr {
    display: block;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .table tbody tr:last-child {
    border-bottom: none;
  }
  
  .table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border: none;
    text-align: right;
  }
  
  .table td::before {
    content: attr(data-label);
    font-weight: 500;
    color: #080808;
    text-align: left;
    margin-right: 16px;
    flex-shrink: 0;
  }
  
  .actions-cell {
    justify-content: flex-end;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .actions-cell::before {
    display: none;
  }
}

@media (max-width: 480px) {
  .table td {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    color: var(--text-color);
  }
  
  .table td::before {
    margin-right: 0;
    font-size: 0.8rem;
  }
}
</style>