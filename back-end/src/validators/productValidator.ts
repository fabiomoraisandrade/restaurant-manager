import joi from "joi";
import { ProductRequest } from "../types/ProductTypes";

const schema = joi.object().keys({
  name: joi.string().empty(false).required(),
  price: joi.number().positive().precision(2).required(),
  description: joi.string().empty(false).required(),
  banner: joi.string().empty(false).required(),
  category_id: joi.string().empty(false).required(),
});

const patchSchema = joi.object().keys({
  name: joi.string().empty(false).optional(),
  price: joi.number().positive().precision(2).optional(),
  description: joi.string().empty(false).optional(),
  banner: joi.string().empty(false).optional(),
  category_id: joi.string().empty(false).optional(),
});

const validateProduct = (product: ProductRequest) => {
  const { error } = schema.validate(product);
  return error ? error.details[0].message : false;
};

const validatePartialProduct = (product: ProductRequest) => {
  const { error } = patchSchema.validate(product);
  return error ? error.details[0].message : false;
};

export { validateProduct, validatePartialProduct };
