import { Router } from "express";
import OrderController from "../../controllers/v1/OrderController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const orderRouter = Router();

orderRouter.get("/", authMiddleware, new OrderController().findAll);
orderRouter.get(
  "/ready",
  authMiddleware,
  new OrderController().findAllByStatusAndDraft,
);
orderRouter.get("/:id", authMiddleware, new OrderController().getOrderById);
orderRouter.get(
  "/orderItem/:id",
  authMiddleware,
  new OrderController().getOrderItemsByOrderId,
);
orderRouter.post("/", authMiddleware, new OrderController().create);
orderRouter.delete("/:id", authMiddleware, new OrderController().deleteOrder);
orderRouter.post(
  "/orderItem",
  authMiddleware,
  new OrderController().addItemToOrder,
);
orderRouter.delete(
  "/orderItem/:id",
  authMiddleware,
  new OrderController().removeItemFromOrder,
);
orderRouter.patch("/:id/send", authMiddleware, new OrderController().sendOrder);

export default orderRouter;
