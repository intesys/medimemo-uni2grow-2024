const ERROR_MESSAGE = "this field is requied";

const isNotEmpty = (value) => {
  if (value !== "") {
    return "";
  } else {
    return "this field is required";
  }
};

const validationSchema = {
  userName: isNotEmpty,
  passWord: isNotEmpty,
};

export function validateForm(values) {
  const errors = {};
  // let isValid=true;
  Object.keys(validationSchema).forEach((fieldName) => {
    const value = values[fieldName];
    const error = validationSchema[fieldName](value);
    if (error) {
      errors[fieldName] = error;
    }
  });
  return errors;
}

export function validateField(fieldName, value) {
  const error = validationSchema[fieldName](value);
  return error;
}
