// import { IContact } from "../models/Contact";

const ERROR_MESSAGE = "this field is required";

const isNoEmpty = (value: string): string => {
  if (value != "") {
    return "";
  } else {
    return ERROR_MESSAGE;
  }
};
// const isValidNumber = (number: number): string => {
//   if (number != null) {
//     return "";
//   } else {
//     return ERROR_MESSAGE;
//   }
// };

export const contactValidationSchema: Record<string, validationType> = {
  name: isNoEmpty,
  notes: isNoEmpty,
//   qualification: isNoEmpty,
  profession: isNoEmpty,
  phone: isNoEmpty,
  email: isNoEmpty,
  address: isNoEmpty
};

export interface formError {
  [key: string]: string;
}

export interface formValues {
  [key: string]: string;
}

type validationType = (value: string) => string;

export function validateContactForm(values: formValues): formError {
  const errors: formError = {};
  Object.keys(contactValidationSchema).forEach((fieldName) => {
    const value = values[fieldName];
    const error = contactValidationSchema[fieldName](value);
    if (error) errors[fieldName] = error;
  });
  return errors;
}

export function validationContactField(
  fieldName: string,
  value: string
): string {
  const error = contactValidationSchema[fieldName](value);
  return error;
}
