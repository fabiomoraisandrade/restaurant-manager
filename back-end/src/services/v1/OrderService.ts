import { OrderRequest, AddItemToOrder } from "./../../types/OrderTypes";
import validateOrder from "../../validators/orderValidator";
import validateOrderItem from "../../validators/orderItemValidator";
import { ApiError } from "../../errors/apiError";
import OrderRepository from "../../repositories/OrderRepository";
import ProductRepository from "../../repositories/ProductRepository";
import OrderItemRepository from "../../repositories/OrderItemRepository";

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

  async getOrderItemsByOrderId(orderId: string) {
    return OrderItemRepository.findByOrderId(orderId);
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

  async addItemToOrder(orderItemData: AddItemToOrder) {
    const error = validateOrderItem(orderItemData);
    if (error) throw ApiError.badRequest(error);

    const product = await ProductRepository.findById(orderItemData.product_id);
    if (!product) {
      throw ApiError.notFound("Product not found.");
    }

    const orderItem = await OrderItemRepository.create(orderItemData);
    return orderItem;
  }

  async removeItemFromOrder(orderItemId: string) {
    const orderItem = await OrderItemRepository.findById(orderItemId);
    if (!orderItem) {
      throw ApiError.notFound("OrderItem not found.");
    }
    await OrderItemRepository.delete(orderItemId);
    return orderItem;
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
