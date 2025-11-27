import store from '@/store';

export const attributeGuard = (to, from, next) => {
  const requiredAttributes = to.meta?.attributes;
  
  if (!requiredAttributes) {
    return next();
  }
  
  const userAttributes = store.getters['attributes/userAttributes'];
  const hasAttributes = checkAttributes(requiredAttributes, userAttributes);
  
  if (hasAttributes) {
    next();
  } else {
    next({ name: 'Unauthorized' });
  }
};

function checkAttributes(requiredAttributes, userAttributes) {
  for (const [key, value] of Object.entries(requiredAttributes)) {
    if (userAttributes[key] !== value) {
      return false;
    }
  }
  return true;
}