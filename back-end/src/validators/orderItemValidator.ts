import joi from "joi";
import { OrderItemRequest } from "../types/OrderItemTypes";

const schema = joi.object().keys({
  order_id: joi.string().empty(false).required(),
  product_id: joi.string().empty(false).required(),
  amount: joi.number().strict().integer().min(1).required(),
});

const patchSchema = joi.object().keys({
  order_id: joi.string().empty(false).optional(),
  product_id: joi.string().empty(false).optional(),
  amount: joi.number().strict().integer().min(1).optional(),
});

const validateOrderItem = (orderItem: OrderItemRequest) => {
  const { error } = schema.validate(orderItem);
  return error ? error.details[0].message : false;
};

const validatePartialOrderItem = (orderItem: OrderItemRequest) => {
  const { error } = patchSchema.validate(orderItem);
  return error ? error.details[0].message : false;
};

export { validateOrderItem, validatePartialOrderItem };
