import api from './index';

export const resourcesApi = {
  // Categorías
  getCategories() {
    return api.get('/categoria');
  },
  
  getCategoryTree() {
    return api.get('/categoria/arbol');
  },
  
  getMainCategories() {
    return api.get('/categoria/principales');
  },
  
  getCategoriesByType(type) {
    return api.get(`/categoria/tipo/${type}`);
  },
  
  getCategory(id) {
    return api.get(`/categoria/${id}`);
  },
  
  createCategory(categoryData) {
    return api.post('/categoria', categoryData);
  },
  
  updateCategory(id, categoryData) {
    return api.put(`/categoria/${id}`, categoryData);
  },
  
  deleteCategory(id) {
    return api.delete(`/categoria/${id}`);
  }
};