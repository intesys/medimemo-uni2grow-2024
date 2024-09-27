const ERROR_MESSAGE = "this field is required";

const isNoEmpty = (value) => {
  if (value != "") {
    return "";
  } else {
    return ERROR_MESSAGE;
  }
};

export const validationSchema = {
  username: isNoEmpty,
  password: isNoEmpty,
};

export function validateForm(values) {
  const errors = {};
  Object.keys(validationSchema).forEach((fieldName) => {
    const value = values[fieldName];
    const error = validationSchema[fieldName](value);
    if (error) errors[fieldName] = error;
  });
  return errors;
}

export function validationField(fieldName, value) {
  const error = validationSchema[fieldName](value);
  return error;
}
