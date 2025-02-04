import joi from "joi";
import { OrderRequest } from "../types/OrderTypes";

const schema = joi.object().keys({
  table: joi.number().strict().integer().min(1).required(),
  name: joi.string().empty(true),
});

const validateOrder = (order: OrderRequest) => {
  const { error } = schema.validate(order);

  if (error) {
    return error.details[0].message;
  }

  return false;
};

export default validateOrder;
