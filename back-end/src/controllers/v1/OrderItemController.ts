import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import OrderItemService from "../../services/v1/OrderItemService";

class OrderItemController {
  async findAll(_req: Request, res: Response) {
    const orderItems = await OrderItemService.findAll();

    return res.status(StatusCodes.OK).json(orderItems);
  }

  async getOrderItemById(req: Request, res: Response) {
    const { id } = req.params;
    const orderItemDetails = await OrderItemService.getOrderItemById(id);

    return res.status(StatusCodes.OK).json(orderItemDetails);
  }

  async getOrderItemsByOrderId(req: Request, res: Response) {
    const { orderId } = req.params;
    const orderItems = await OrderItemService.getOrderItemsByOrderId(orderId);

    return res.status(StatusCodes.OK).json(orderItems);
  }

  async create(req: Request, res: Response) {
    const orderItem = await OrderItemService.create(req.body);

    return res.status(StatusCodes.CREATED).json(orderItem);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await OrderItemService.delete(id);

    return res.status(StatusCodes.NO_CONTENT).end();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updatedOrderItem = await OrderItemService.update(id, req.body);

    return res.status(StatusCodes.OK).json(updatedOrderItem);
  }

  async partialUpdate(req: Request, res: Response) {
    const { id } = req.params;
    const updatedOrderItem = await OrderItemService.partialUpdate(id, req.body);

    return res.status(StatusCodes.OK).json(updatedOrderItem);
  }
}

export default OrderItemController;
