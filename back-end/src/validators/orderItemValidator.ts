import joi from "joi";
import { OrderItemRequest } from "../types/OrderItemTypes";

const schema = joi.object().keys({
  order_id: joi.string().empty(false).required(),
  product_id: joi.string().empty(false).required(),
  amount: joi.number().strict().integer().min(1).required(),
});

const validateOrderItem = (orderItem: OrderItemRequest) => {
  const { error } = schema.validate(orderItem);

  if (error) {
    return error.details[0].message;
  }

  return false;
};

export default validateOrderItem;
