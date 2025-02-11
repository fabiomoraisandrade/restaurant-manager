import joi from "joi";
import { OrderRequest, OrderUpdate } from "../types/OrderTypes";

const schema = joi.object().keys({
  table: joi.number().strict().integer().min(1).required(),
  name: joi.string().empty(true).optional(),
});

const putSchema = joi.object().keys({
  table: joi.number().strict().integer().min(1).required(),
  status: joi.boolean().required(),
  draft: joi.boolean().required(),
  name: joi.string().empty(true).optional(),
});

const patchSchema = joi.object().keys({
  table: joi.number().strict().integer().min(1).optional(),
  status: joi.boolean().optional(),
  draft: joi.boolean().optional(),
  name: joi.string().empty(true).optional(),
});

const validateOrder = (order: OrderRequest) => {
  const { error } = schema.validate(order);
  return error ? error.details[0].message : false;
};

const validateUpdateOrder = (order: OrderUpdate) => {
  const { error } = putSchema.validate(order);
  return error ? error.details[0].message : false;
};

const validatePartialOrder = (order: OrderUpdate) => {
  const { error } = patchSchema.validate(order);
  return error ? error.details[0].message : false;
};

export { validateOrder, validateUpdateOrder, validatePartialOrder };
