import joi from "joi";
import { ProductRequest } from "../types/ProductTypes";

const schema = joi.object().keys({
  name: joi.string().empty(false).required(),
  price: joi.number().positive().precision(2).required(),
  description: joi.string().empty(false).required(),
  banner: joi.string().empty(false).required(),
  category_id: joi.string().empty(false).required(),
});

const validateProduct = (product: ProductRequest) => {
  const { error } = schema.validate(product);

  if (error) {
    return error.details[0].message;
  }

  return false;
};

export default validateProduct;
