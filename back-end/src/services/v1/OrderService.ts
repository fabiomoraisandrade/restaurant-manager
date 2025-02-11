import { OrderRequest, OrderUpdate } from "./../../types/OrderTypes";
import {
  validateOrder,
  validateUpdateOrder,
  validatePartialOrder,
} from "../../validators/orderValidator";
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

  async update(id: string, orderData: OrderUpdate) {
    const order = await OrderRepository.findById(id);
    if (!order) throw ApiError.notFound("Order not found");

    const error = validateUpdateOrder(orderData);
    if (error) throw ApiError.badRequest(error);

    const updatedOrder = await OrderRepository.update(id, orderData);
    return updatedOrder;
  }

  async partialUpdate(id: string, orderData: OrderUpdate) {
    const order = await OrderRepository.findById(id);
    if (!order) throw ApiError.notFound("Order not found");

    const error = validatePartialOrder(orderData);
    if (error) throw ApiError.badRequest(error);

    const updatedOrder = await OrderRepository.update(id, orderData);
    return updatedOrder;
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
