// Validadores básicos
export const emailValidator = (email) => {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const requiredValidator = (value) => {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return value !== null && Object.keys(value).length > 0;
  return value !== null && value !== undefined && value !== '';
};

export const minLengthValidator = (value, minLength) => {
  return value && value.length >= minLength;
};

export const maxLengthValidator = (value, maxLength) => {
  return !value || value.length <= maxLength;
};

export const passwordValidator = (password) => {
  return password && password.length >= 8;
};

// Validadores avanzados para ABAC y gestión de usuarios
export const roleValidator = (role) => {
  const validRoles = ['admin', 'user', 'manager', 'viewer'];
  return validRoles.includes(role);
};

export const permissionValidator = (permissions) => {
  if (!Array.isArray(permissions)) return false;
  const validPermissions = ['read', 'write', 'delete', 'manage_users'];
  return permissions.every(permission => validPermissions.includes(permission));
};

// Validadores para formularios de usuario
export const usernameValidator = (username) => {
  if (!username) return false;
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return re.test(username);
};

export const phoneValidator = (phone) => {
  if (!phone) return true; // Opcional
  const re = /^\+?[\d\s\-\(\)]{10,}$/;
  return re.test(phone.replace(/\s/g, ''));
};

export const dateValidator = (date) => {
  if (!date) return true;
  return !isNaN(Date.parse(date));
};

// Validadores compuestos para gestión de usuarios
export const userCreateValidator = (userData) => {
  return {
    email: emailValidator(userData.email),
    username: usernameValidator(userData.username),
    password: passwordValidator(userData.password),
    role: roleValidator(userData.role),
    required: requiredValidator(userData.email) && requiredValidator(userData.username)
  };
};

export const userUpdateValidator = (userData) => {
  const validations = {
    email: emailValidator(userData.email),
    username: usernameValidator(userData.username),
    role: roleValidator(userData.role)
  };
  
  // La contraseña es opcional en actualización
  if (userData.password) {
    validations.password = passwordValidator(userData.password);
  }
  
  return validations;
};

// Validador para políticas ABAC
export const abacPolicyValidator = (policy) => {
  if (!policy || typeof policy !== 'object') return false;
  
  const requiredFields = ['attribute', 'operator', 'value'];
  return requiredFields.every(field => 
    requiredValidator(policy[field])
  );
};

// Validador para rutas de la aplicación
export const routePathValidator = (path) => {
  if (!path) return false;
  return path.startsWith('/') && path.length > 1;
};

// Función utilitaria para validar formularios completos
export const validateForm = (formData, validations) => {
  const errors = {};
  
  Object.keys(validations).forEach(field => {
    const validation = validations[field];
    const value = formData[field];
    
    if (validation.required && !requiredValidator(value)) {
      errors[field] = validation.requiredMessage || `${field} es requerido`;
    } else if (validation.validator && !validation.validator(value)) {
      errors[field] = validation.message || `${field} no es válido`;
    } else if (validation.minLength && !minLengthValidator(value, validation.minLength)) {
      errors[field] = validation.message || `${field} debe tener al menos ${validation.minLength} caracteres`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Exportar todos los validadores
export default {
  emailValidator,
  requiredValidator,
  minLengthValidator,
  maxLengthValidator,
  passwordValidator,
  roleValidator,
  permissionValidator,
  usernameValidator,
  phoneValidator,
  dateValidator,
  userCreateValidator,
  userUpdateValidator,
  abacPolicyValidator,
  routePathValidator,
  validateForm
};