import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import OrderService from "../../services/v1/OrderService";

class OrderController {
  async findAll(_req: Request, res: Response) {
    const orders = await OrderService.findAll();

    return res.status(StatusCodes.OK).json(orders);
  }

  async findAllByStatusAndDraft(req: Request, res: Response) {
    const orders = await OrderService.findAllByStatusAndDraft();

    return res.status(StatusCodes.OK).json(orders);
  }

  async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    const orderDetails = await OrderService.getOrderById(id);

    return res.status(StatusCodes.OK).json(orderDetails);
  }

  async getOrderItemsByOrderId(req: Request, res: Response) {
    const { orderItemId } = req.params;
    const orderItems = await OrderService.getOrderItemsByOrderId(orderItemId);

    return res.status(StatusCodes.OK).json(orderItems);
  }

  async create(req: Request, res: Response) {
    const order = await OrderService.create(req.body);
    return res.status(StatusCodes.CREATED).json(order);
  }

  async deleteOrder(req: Request, res: Response) {
    const { id } = req.params;
    await OrderService.deleteOrder(id);
    return res.status(StatusCodes.NO_CONTENT).send();
  }

  async addItemToOrder(req: Request, res: Response) {
    const orderItem = await OrderService.addItemToOrder(req.body);
    return res.status(StatusCodes.CREATED).json(orderItem);
  }

  async removeItemFromOrder(req: Request, res: Response) {
    const { id } = req.params;
    await OrderService.removeItemFromOrder(id);
    return res.status(StatusCodes.NO_CONTENT).send();
  }

  async sendOrder(req: Request, res: Response) {
    const { id } = req.params;
    const updatedOrder = await OrderService.sendOrder(id);
    return res.status(StatusCodes.OK).json(updatedOrder);
  }
}

export default OrderController;
