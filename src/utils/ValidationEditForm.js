const isNotCorrect = (value) => {
  if (isEmpty(value)) {
    return true;
  } else {
    if (value.length < 10) {
      return true;
    }
    return false;
  }
};

const validationSchema = {
  username: isNotCorrect,
  medicalId: isNotCorrect,
  alergie: isNotCorrect,
  tel: isNotCorrect,
  email: isNotCorrect,
  address: isNotCorrect,
};

const isEmpty = (value) => {
  if (value) {
    return false;
  } else {
    return true;
  }
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
  const isError = validationSchema[fieldName](value);
  return isError;
};
