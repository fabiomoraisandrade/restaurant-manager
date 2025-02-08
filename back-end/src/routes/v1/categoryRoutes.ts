import { Router } from "express";
import CategoryController from "../../controllers/v1/CategoryController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const categoryRouter = Router();

categoryRouter.get("/", authMiddleware, new CategoryController().findAll);
categoryRouter.get(
  "/:id",
  authMiddleware,
  new CategoryController().getCategoryById,
);
categoryRouter.post("/", authMiddleware, new CategoryController().create);
categoryRouter.delete("/:id", authMiddleware, new CategoryController().delete);
categoryRouter.put("/:id", authMiddleware, new CategoryController().update);
categoryRouter.patch(
  "/:id",
  authMiddleware,
  new CategoryController().partialUpdate,
);

export default categoryRouter;
