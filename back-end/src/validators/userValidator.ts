import joi from "joi";
import { UserRequest } from "../types/UserTypes";

const schema = joi.object().keys({
  name: joi.string().empty(false).required(),
  email: joi.string().email().empty(false).required(),
  password: joi.string().empty(false).min(6).required(),
});

const validateUser = (user: UserRequest) => {
  const { error } = schema.validate(user);

  if (error) {
    return error.details[0].message;
  }

  return false;
};

export default validateUser;
