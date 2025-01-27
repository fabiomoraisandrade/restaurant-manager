import { Router } from "express";
import CategoryController from "../../controllers/v1/CategoryController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const categoryRouter = Router();

categoryRouter.post("/", authMiddleware, new CategoryController().create);

export default categoryRouter;
