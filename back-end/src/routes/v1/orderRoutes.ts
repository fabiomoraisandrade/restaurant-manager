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
orderRouter.post("/", authMiddleware, new OrderController().create);
orderRouter.delete("/:id", authMiddleware, new OrderController().delete);
orderRouter.put("/:id", authMiddleware, new OrderController().update);
orderRouter.patch("/:id", authMiddleware, new OrderController().partialUpdate);
orderRouter.patch("/:id/send", authMiddleware, new OrderController().sendOrder);
orderRouter.patch(
  "/:id/finish",
  authMiddleware,
  new OrderController().finishOrder,
);

export default orderRouter;
