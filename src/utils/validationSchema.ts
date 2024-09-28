const ERR_MESSAGE = "This field is required";

const isNotEmpty = (value:string):string => {
  if (value) {
    return "";
  } else {
    return ERR_MESSAGE;
  }
};

interface IValidation{
  username: any;
  password: any;
} 

const validationSchema : IValidation = {
  username: isNotEmpty ,
  password: isNotEmpty,
};

export const validationForm = (values:any) => {
  const errors = {};
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