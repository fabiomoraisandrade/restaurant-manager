import joi from "joi";
import { UserRequest } from "../types/UserTypes";

const schema = joi.object().keys({
  name: joi.string().empty(false).required(),
  email: joi.string().email().empty(false).required(),
  password: joi.string().empty(false).min(6).required(),
});

const patchSchema = joi.object().keys({
  name: joi.string().empty(false).optional(),
  email: joi.string().email().empty(false).optional(),
  password: joi.string().empty(false).min(6).optional(),
});

const validateUser = (user: UserRequest) => {
  const { error } = schema.validate(user);
  return error ? error.details[0].message : false;
};

const validatePartialUser = (user: UserRequest) => {
  const { error } = patchSchema.validate(user);
  return error ? error.details[0].message : false;
};

export { validateUser, validatePartialUser };
