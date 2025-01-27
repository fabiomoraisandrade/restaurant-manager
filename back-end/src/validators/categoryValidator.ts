import joi from "joi";
import { CategoryRequest } from "../types/CategoryTypes";

const schema = joi.object().keys({
  name: joi.string().empty(false).required(),
});

const validateCategory = (category: CategoryRequest) => {
  const { error } = schema.validate(category);

  if (error) {
    return error.details[0].message;
  }

  return false;
};

export default validateCategory;
