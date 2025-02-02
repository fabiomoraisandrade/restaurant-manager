import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import OrderService from "../../services/v1/OrderService";

class OrderController {
  async findAll(_req: Request, res: Response) {
    const orders = await OrderService.findAll();

    return res.status(StatusCodes.OK).json(orders);
  }

  async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    const orderDetails = await OrderService.getProductById(id);

    return res.status(StatusCodes.OK).json(orderDetails);
  }

  async create(req: Request, res: Response) {
    const order = await OrderService.create(req.body);
    return res.status(StatusCodes.CREATED).json(order);
  }
}

export default OrderController;
