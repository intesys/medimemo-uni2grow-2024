const ERR_MESSAGE = "This field is required";

const isNotEmpty = (value) => {
  if (value) {
    return "";
  } else {
    return ERR_MESSAGE;
  }
};

const validationSchema = {
  username: isNotEmpty,
  password: isNotEmpty,
};

export const validationForm = (values) => {
  const errors = {};
  Object.keys(validationSchema).forEach((fieldName) => {
    const value = values[fieldName];
    const error = validationSchema[fieldName](value);

    if (error) errors[fieldName] = error;
  });
  return errors;
};

export const validationField = (fieldName, value) => {
  const error = validationSchema[fieldName](value);
  return error;
};