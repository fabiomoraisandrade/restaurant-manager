import joi from "joi";
import { LoginRequest } from "../types/UserTypes";

const schema = joi.object().keys({
  email: joi.string().email().empty(false).required(),
  password: joi.string().empty(false).min(6).required(),
});

const validateLogin = (loginData: LoginRequest) => {
  const { error } = schema.validate(loginData);

  if (error) {
    return error.details[0].message;
  }

  return false;
};

export default validateLogin;
