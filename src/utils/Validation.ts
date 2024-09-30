const ERROR_MESSAGE: string = "This field is required";

// Fonction qui vérifie si un champ n'est pas vide
const isNoEmpty = (value: string): string => {
  return value !== "" ? "" : ERROR_MESSAGE;
};

interface ValidationSchema {
  [key: string]: (value: string) => string;
}

export const validationSchema: ValidationSchema = {
  username: isNoEmpty,
  password: isNoEmpty,
};

interface Errors {
  username?: string;
  password?: string;
}

interface Values {
  username: string;
  password: string;
}

// Fonction qui valide l'ensemble du formulaire
export function validateForm(values: Values): Errors {
  const errors: Errors = {}; 
  Object.keys(validationSchema).forEach((fieldName) => {
    const value = values[fieldName as keyof Values]; // Récupération de la valeur du champ
    const error = validationSchema[fieldName](value); // Application de la validation sur chaque champ
    if (error) errors[fieldName as keyof Errors] = error; // Ajout de l'erreur si nécessaire
  });
  return errors;
}

// Fonction qui valide un champ spécifique
export function validationField(fieldName: string, value: string): string {
  const error = validationSchema[fieldName](value); 
  return error;
}


// const ERROR_MESSAGE = "this field is required";

// const isNoEmpty = (value) => {
//   if (value != "") {
//     return "";
//   } else {
//     return ERROR_MESSAGE;
//   }
// };

// export const validationSchema = {
//   username: isNoEmpty,
//   password: isNoEmpty,
// };

// export function validateForm(values) {
//   const errors = {};
//   Object.keys(validationSchema).forEach((fieldName) => {
//     const value = values[fieldName];
//     const error = validationSchema[fieldName](value);
//     if (error) errors[fieldName] = error;
//   });
//   return errors;
// }

// export function validationField(fieldName, value) {
//   const error = validationSchema[fieldName](value);
//   return error;
// }
