// validation.js

// declarations of types we'll use
type Credentials = {
  username: string;
  password: string;
};

// Check if a field is empty
export const isEmpty = (value: string) => value.trim() === "";

// Validate a specific field
export const validateField = (fieldName: string, value: string) => {
  let errorMessage = "";
  if (isEmpty(value)) {
    errorMessage = `${
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    } is required`;
  }
  return errorMessage;
};

// Validate the entire form
export const validateForm = (
  credential: Credentials
): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (isEmpty(credential.username)) {
    errors.username = "Username is required";
  }
  if (isEmpty(credential.password)) {
    errors.password = "Password is required";
  }

  // Return the errors object
  return errors;
};
