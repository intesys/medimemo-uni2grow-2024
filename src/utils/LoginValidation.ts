const ERRORS_MESSAGE = "This field is required";
const iSNotEmpty = (value) => {
  if (value) {
    return "";
  } else {
    return ERRORS_MESSAGE;
  }
};

const validationSchema = {
  email: iSNotEmpty,
  password: iSNotEmpty,
};

export const validateForm = (values) => {
  const errors = {};
  Object.keys(values).forEach((fieldName) => {
    const value = values[fieldName];
    const test = validationSchema[fieldName];
    const error = test(value);
    if (error) {
      errors[fieldName] = error;
    }
  });
  return errors;
};

export const validateField = (fieldName, value) => {
  const test = validationSchema[fieldName];
  const error = test(value);
  return error;
};
