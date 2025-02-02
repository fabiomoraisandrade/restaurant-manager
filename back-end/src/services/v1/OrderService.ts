import { OrderRequest } from "./../../types/OrderTypes";
import validateOrder from "../../validators/orderValidator";
import { ApiError } from "../../errors/apiError";
import OrderRepository from "../../repositories/OrderRepository";

class OrderService {
  async findAll() {
    return OrderRepository.findAll();
  }

  async getProductById(id: string) {
    const orderDetails = await OrderRepository.findById(id);
    if (!orderDetails) throw ApiError.badRequest("Product not found");

    return orderDetails;
  }

  async create(orderData: OrderRequest) {
    const error = validateOrder(orderData);
    if (error) throw ApiError.badRequest(error);

    const order = await OrderRepository.create(orderData);
    return order;
  }
}

export default new OrderService();
