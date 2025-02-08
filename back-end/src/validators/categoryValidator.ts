import joi from "joi";
import { CategoryRequest } from "../types/CategoryTypes";

const schema = joi.object({
  name: joi.string().empty(false).required(),
});

const patchSchema = joi.object({
  name: joi.string().empty(false).optional(),
});

const validateCategory = (category: CategoryRequest) => {
  const { error } = schema.validate(category);
  return error ? error.details[0].message : false;
};

const validatePartialCategory = (category: CategoryRequest) => {
  const { error } = patchSchema.validate(category);
  return error ? error.details[0].message : false;
};

export { validateCategory, validatePartialCategory };
