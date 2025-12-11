// src/utils/themeLoader.js - DEBE exportar loadTheme correctamente
export const loadTheme = (theme = 'light') => {
  
  // Remover clases anteriores
  const html = document.documentElement;
  html.classList.remove('light-theme', 'dark-theme');
  
  // Agregar nueva clase
  html.classList.add(`${theme}-theme`);
  
  // Establecer atributo data-theme
  html.setAttribute('data-theme', theme);
  
  // Guardar en localStorage si es diferente
  const saved = localStorage.getItem('theme');
  if (saved !== theme) {
    localStorage.setItem('theme', theme);
  }
  
  return theme;
};

// Opcional: función para obtener tema guardado
export const getSavedTheme = () => {
  return localStorage.getItem('theme') || 'light';
};