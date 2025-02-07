import { Router } from "express";
import OrderItemController from "../../controllers/v1/OrderItemController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const orderItemRouter = Router();

orderItemRouter.get("/", authMiddleware, new OrderItemController().findAll);
orderItemRouter.get(
  "/:id",
  authMiddleware,
  new OrderItemController().getOrderItemById,
);
orderItemRouter.get(
  "/order/:orderId",
  authMiddleware,
  new OrderItemController().getOrderItemsByOrderId,
);
orderItemRouter.post("/", authMiddleware, new OrderItemController().create);
orderItemRouter.delete(
  "/:id",
  authMiddleware,
  new OrderItemController().delete,
);

export default orderItemRouter;
