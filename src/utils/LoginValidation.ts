const ERRORS_MESSAGE = "This field is required";
const iSNotEmpty = (value:string) => {
  if (value) {
    return "";
  } else {
    return ERRORS_MESSAGE;
  }
};


 export interface FormValue {
  [key: string]: string;
}

 export interface FormError {
  [key: string]: string;
}

 
type validationType = (value: string)=> string;

const validationSchema:Record<string,validationType > = {
  email: iSNotEmpty,
  password: iSNotEmpty,
};


export const validateForm = (values:FormValue):FormError => {
  const errors:FormError  = {};
  Object.keys(values).forEach((fieldName) => {
    const value = values[fieldName];
    const test = validationSchema[fieldName];
    const error = test(value);
    if (error) {
      errors[fieldName] = error;
    }
  });
  return errors;
};


export const validateField = (fieldName:string, value:string):string => {
  const test = validationSchema[fieldName];
  const error = test(value);
  return error;
};
