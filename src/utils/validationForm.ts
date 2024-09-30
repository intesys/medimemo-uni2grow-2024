const ERR_MESSAGE = "This field is required";
//Définition of a  new type
type validationType = (value:string)=>string;

const isNotEmpty = (value:string):string => {
  if (value) {
    return "";
  } else {
    return ERR_MESSAGE;
  }
};

export interface IFormError{
  [key:string] : string;
}

export interface IFormValue{
  [key:string] : string;
}
// interface IValidation{
//   username: validationType;
//   password: validationType;
// } 

// const validationSchema : IValidation = {
//   username: isNotEmpty,
//   password: isNotEmpty,
// };

const validationSchema  : Record<string, validationType> = {
  username: isNotEmpty,
  password: isNotEmpty,
};

export const validationForm = (values:IFormValue) => {
  const errors : IFormError = {};
  Object.keys(validationSchema).forEach((fieldName) => {
    const value = values[fieldName];
    const error = validationSchema[fieldName](value);

    if (error) errors[fieldName] = error;
  });
  return errors;
};

export const validationField = (fieldName:string, value:string):string => {
  const error = validationSchema[fieldName](value);
  return error;
};