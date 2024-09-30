const errorMessage = "Please enter an Email or UserName";

export interface Formvalues {
  [key: string]: string;
}

export interface FormError {
  [key: string]: string;
}

const isNotEmpty = (value: string) => {
  if (value !== "") {
    return "";
  } else {
    return errorMessage;
  }
};

type validationtype = (value: string) => string; //on definit un type pour la fonction de validation du formulation

// const validationSchema = {
//   username: isNotEmpty,
//   password: isNotEmpty,
// };

const validationSchema: Record<string, validationtype> = {
  username: isNotEmpty,
  password: isNotEmpty,
};

export const validateForm = (values: Formvalues): FormError => {
  const errors = {};

  Object.keys(validationSchema).forEach((fieldName) => {
    const value = values[fieldName];
    const test = validationSchema[fieldName];
    const error = test(value);
    if (error) errors[fieldName] = error;
  });
  return errors;
};

export const validateField = (fieldName: string, value: string): string => {
  const test = validationSchema[fieldName];
  const error = test(value);
  return error;
};
