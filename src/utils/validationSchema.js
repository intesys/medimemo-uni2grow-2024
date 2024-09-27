const errorMessage = "this field is required";

const isNoEmpty = (value) => {
  if (value !== "") {
    return "";
  } else {
    return errorMessage;
  }
};
const validationSchema = {
  username: isNoEmpty,
  password: isNoEmpty,
};

export const validateForm = (values) => {
  const errors = {};
  Object.keys(validationSchema).forEach((fieldname) => {
    const value = values[fieldname];
    const test = validationSchema[fieldname];
    const error = test(value);
    if (error) {
      errors[fieldname] = error;
    }
  });

  return errors;
};

export function validateField(fieldname, Values) {
  const test = validationSchema[fieldname];
  const error = test(Values);
  return error;
}
