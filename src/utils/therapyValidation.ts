const ERROR_MESSAGE = "this field is required";

const isNoEmpty = (value: string): string => {
  if (value != "") {
    return "";
  } else {
    return ERROR_MESSAGE;
  }
};

export const therapySchema: Record<string, validationType> = {
    name: isNoEmpty,
    doctor: isNoEmpty,
  }

  export interface formError{
    [key: string]: string;
  }

  export interface ITherapy{
    [key: string]: string | number;
  }

  export interface formValues{
    [key: string]: string;
  }

  type validationType =  (value: string)=> string;

  export function validateForm(values: formValues): formError {
    const errors:  formError = {};
    Object.keys(therapySchema).forEach((fieldName) => {
      const value = values[fieldName];
      const error = therapySchema[fieldName](value);
      if (error) errors[fieldName] = error;
    });
    return errors;
  }

  export function validationField(fieldName: string, value: string): string {
    const error = therapySchema[fieldName](value);
    return error;
  }