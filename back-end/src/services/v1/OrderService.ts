import { OrderRequest } from "./../../types/OrderTypes";
import validateOrder from "../../validators/orderValidator";
import { ApiError } from "../../errors/apiError";
import OrderRepository from "../../repositories/OrderRepository";

class OrderService {
  async findAll() {
    return OrderRepository.findAll();
  }

  async findAllByStatusAndDraft() {
    return OrderRepository.findAllByStatusAndDraft();
  }

  async getOrderById(id: string) {
    const orderDetails = await OrderRepository.findById(id);
    if (!orderDetails) throw ApiError.notFound("Order not found");

    return orderDetails;
  }

  async create(orderData: OrderRequest) {
    const error = validateOrder(orderData);
    if (error) throw ApiError.badRequest(error);

    const order = await OrderRepository.create(orderData);
    return order;
  }

  async deleteOrder(id: string) {
    const order = await OrderRepository.findById(id);
    if (!order) throw ApiError.notFound("Order not found");

    await OrderRepository.delete(id);
    return order;
  }

  async sendOrder(id: string) {
    const order = await OrderRepository.findById(id);
    if (!order) throw ApiError.notFound("Order not found");

    return await OrderRepository.updateDraft(id);
  }

  async finishOrder(id: string) {
    const order = await OrderRepository.findById(id);
    if (!order) throw ApiError.notFound("Order not found");

    return await OrderRepository.updateStatus(id);
  }
}

export default new OrderService();
