export const emailValidator = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const requiredValidator = (value) => {
  return value !== null && value !== undefined && value !== '';
};

export const minLengthValidator = (value, minLength) => {
  return value && value.length >= minLength;
};

export const passwordValidator = (password) => {
  return password && password.length >= 8;
};