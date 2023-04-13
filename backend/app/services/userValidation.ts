import { ErrorType } from "../DataTypes/error";
import Users from "../model/users";

interface InputData {
  [key: string]: string;
}

// validate existing user in db
export const userExists = async (param: string, checkType: string) => {
  const queryType =
    checkType === "email" ? { email: param } : { username: param };
  const user = await Users.findOne(queryType);

  return user;
};
// validate email address
export const isEmail = (email: string): boolean => {
  if (
    email &&
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) {
    return true;
  }
  return false;
};
// validate phone number
export const isPhoneNumber = (phone: string): boolean => {
  if (
    phone &&
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone)
  ) {
    return true;
  }
  return false;
};

// input validation
export const inputValidation = async (
  inputs: InputData
): Promise<ErrorType[]> => {
  let errors: ErrorType[] = [];
  for (let [key, value] of Object.entries(inputs)) {
    value = value.trim();
    if (!value) {
      errors.push({ field: key, message: `${key} is a required field` });
    }
    if (value && value.length <= 8 && key === "password") {
      errors.push({
        field: key,
        message: `${key} should be longer than 8 characters`,
      });
    }
    if (value && key === "phone" && !isPhoneNumber(value)) {
      errors.push({
        field: key,
        message: `${key} is not phone number`,
      });
    }
    if (value && value.length <= 5 && key === "username") {
      errors.push({
        field: key,
        message: `${key} should be longer than 5 characters`,
      });
    }
    if (value && key === "email" && !isEmail(value)) {
      errors.push({ field: key, message: `Enter valid ${key}` });
    }
  }

  return errors;
};
