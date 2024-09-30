export interface formValue {
  [key: string]: string;
}

export interface formErrors {
  [key: string]: string;
}

const errorMessage = "this field is required";

const isNoEmpty = (value: string): string => {
  if (value !== "") {
    return "";
  } else {
    return errorMessage;
  }
};
type validationType = (value: string) => string;
const validationSchema: Record<string, validationType> = {
  username: isNoEmpty,
  password: isNoEmpty,
};

export const validateForm = (values: formValue): formErrors => {
  const errors: formErrors = {};
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

export function validateField(fieldname: string, Values: string): string {
  const test = validationSchema[fieldname];
  const error = test(Values);
  return error;
}
