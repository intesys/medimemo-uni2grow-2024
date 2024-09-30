const ERROR_MESSAGE = "this field is required";

const isNoEmpty = (value: string): string => {
  return value !== "" ? "" : ERROR_MESSAGE;
};

interface ValidationSchema {
  [key: string]: (value: string) => string;
}

export const validationShema: ValidationSchema = {
  username: isNoEmpty,
  password: isNoEmpty,
};

export interface FormValue {
  [key: string]: string;
}

export interface FormError {
  [key: string]: string;
}

export function validationForm(values: FormValue): FormError {
  const errors: FormError = {};
  Object.keys(validationShema).forEach((fieldName) => {
    const value = values[fieldName];
    const error = validationShema[fieldName](value);
    if (error) errors[fieldName] = error;
  });
  return errors;
}

export function validationField(fieldName: string, value: string): string {
  const error = validationShema[fieldName](value);
  return error;
}