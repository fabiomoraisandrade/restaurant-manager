import { Router } from "express";
import multer from "multer";
import ProductController from "../../controllers/v1/ProductController";
import { authMiddleware } from "../../middlewares/authMiddleware";
import uploadConfig from "../../../infra/multer";

const productRouter = Router();
const upload = multer(uploadConfig.upload("./tmp"));

productRouter.get("/", new ProductController().findAll);
productRouter.get(
  "/category",
  authMiddleware,
  new ProductController().getProductsByCategoryId,
);
productRouter.get(
  "/:id",
  authMiddleware,
  new ProductController().getProductById,
);
productRouter.post(
  "/",
  authMiddleware,
  upload.single("file"),
  new ProductController().create,
);

export default productRouter;
