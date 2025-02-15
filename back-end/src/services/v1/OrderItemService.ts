import { OrderItemRequest } from "./../../types/OrderItemTypes";
import {
  validateOrderItem,
  validatePartialOrderItem,
} from "../../validators/orderItemValidator";
import { ApiError } from "../../errors/apiError";
import ProductRepository from "../../repositories/ProductRepository";
import OrderItemRepository from "../../repositories/OrderItemRepository";
import OrderRepository from "../../repositories/OrderRepository";

class OrderItemService {
  async findAll() {
    return OrderItemRepository.findAll();
  }

  async getOrderItemById(id: string) {
    const orderItemDetails = await OrderItemRepository.findById(id);
    if (!orderItemDetails) throw ApiError.notFound("OrderItem not found");

    return orderItemDetails;
  }

  async getOrderItemsByOrderId(orderId: string) {
    return OrderItemRepository.findByOrderId(orderId);
  }

  async create(orderItemData: OrderItemRequest) {
    const error = validateOrderItem(orderItemData);
    if (error) throw ApiError.badRequest(error);

    const order = await OrderRepository.findById(orderItemData.order_id);
    if (!order) throw ApiError.notFound("Order not found.");

    const product = await ProductRepository.findById(orderItemData.product_id);
    if (!product) throw ApiError.notFound("Product not found.");

    const orderItem = await OrderItemRepository.create(orderItemData);
    return orderItem;
  }

  async delete(id: string) {
    const orderItem = await OrderItemRepository.findById(id);
    if (!orderItem) throw ApiError.notFound("OrderItem not found.");

    await OrderItemRepository.delete(id);
    return orderItem;
  }

  async update(id: string, orderItemData: OrderItemRequest) {
    const orderItem = await OrderItemRepository.findById(id);
    if (!orderItem) throw ApiError.notFound("OrderItem not found.");

    const error = validateOrderItem(orderItemData);
    if (error) throw ApiError.badRequest(error);

    const order = await OrderRepository.findById(orderItemData.order_id);
    if (!order) throw ApiError.notFound("Order not found.");

    const produtc = await ProductRepository.findById(orderItemData.product_id);
    if (!produtc) throw ApiError.notFound("Product not found.");

    const updatedOrderItem = await OrderItemRepository.update(
      id,
      orderItemData,
    );
    return updatedOrderItem;
  }

  async partialUpdate(id: string, orderItemData: OrderItemRequest) {
    const orderItem = await OrderItemRepository.findById(id);
    if (!orderItem) throw ApiError.notFound("OrderItem not found");

    const error = validatePartialOrderItem(orderItemData);
    if (error) throw ApiError.badRequest(error);

    if (orderItemData.order_id) {
      const order = await OrderRepository.findById(orderItemData.order_id);
      if (!order) throw ApiError.notFound("Order not found.");
    }

    if (orderItemData.product_id) {
      const produtc = await ProductRepository.findById(
        orderItemData.product_id,
      );
      if (!produtc) throw ApiError.notFound("Product not found.");
    }

    const updatedOrderItem = await OrderItemRepository.update(
      id,
      orderItemData,
    );
    return updatedOrderItem;
  }
}

export default new OrderItemService();
