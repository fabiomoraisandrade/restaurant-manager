import { Router } from "express";
import OrderController from "../../controllers/v1/OrderController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const orderRouter = Router();

orderRouter.get("/", authMiddleware, new OrderController().findAll);
orderRouter.get("/:id", authMiddleware, new OrderController().getOrderById);
orderRouter.post("/", authMiddleware, new OrderController().create);

export default orderRouter;
