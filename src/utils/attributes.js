export const evaluateABAC = (policies, userAttributes, resource, action, environment = {}) => {
  return policies.some(policy => {
    return policy.rules.every(rule => {
      return evaluateRule(rule, userAttributes, resource, action, environment);
    });
  });
};

export const evaluateRule = (rule, userAttributes, resource, action, environment) => {
  // Evaluar condiciones del usuario
  if (rule.user) {
    for (const [key, value] of Object.entries(rule.user)) {
      if (userAttributes[key] !== value) {
        return false;
      }
    }
  }
  
  // Evaluar condiciones del recurso
  if (rule.resource) {
    for (const [key, value] of Object.entries(rule.resource)) {
      if (resource[key] !== value) {
        return false;
      }
    }
  }
  
  // Evaluar condiciones de acción
  if (rule.action && rule.action !== action) {
    return false;
  }
  
  // Evaluar condiciones del entorno
  if (rule.environment) {
    for (const [key, value] of Object.entries(rule.environment)) {
      if (environment[key] !== value) {
        return false;
      }
    }
  }
  
  return true;
};