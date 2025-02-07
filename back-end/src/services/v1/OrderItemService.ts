import { OrderItemRequest } from "./../../types/OrderItemTypes";
import validateOrderItem from "../../validators/orderItemValidator";
import { ApiError } from "../../errors/apiError";
import ProductRepository from "../../repositories/ProductRepository";
import OrderItemRepository from "../../repositories/OrderItemRepository";

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

    const product = await ProductRepository.findById(orderItemData.product_id);
    if (!product) {
      throw ApiError.notFound("Product not found.");
    }

    const orderItem = await OrderItemRepository.create(orderItemData);
    return orderItem;
  }

  async delete(orderItemId: string) {
    const orderItem = await OrderItemRepository.findById(orderItemId);
    if (!orderItem) {
      throw ApiError.notFound("OrderItem not found.");
    }

    await OrderItemRepository.delete(orderItemId);
    return orderItem;
  }
}

export default new OrderItemService();
