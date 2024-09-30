const ERROR_MESSAGE = "This field is required";

export interface Errors {
  username?: string;
  password?: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}

interface ValidationSchema {
  [key: string]: (value: string) => string;
}


const isNoEmpty = (value: string): string => {
  if (value != "") {
    return "";
  } else {
    return ERROR_MESSAGE;
  }
};

export const validationSchema: ValidationSchema = {
  username: isNoEmpty,
  password: isNoEmpty,
};

export function validateForm(values: LoginRequest) {
  const errors: Errors = {};
  Object.keys(validationSchema).forEach((fieldName) => {
    const value = values[fieldName as keyof LoginRequest];
    const error = validationSchema[fieldName as keyof LoginRequest](value);
    if (error) errors[fieldName as keyof Errors] = error;
  });
  return errors;
}

export function validationField(fieldName: string, value: string): string {
  const error = validationSchema[fieldName](value);
  return error;
}
