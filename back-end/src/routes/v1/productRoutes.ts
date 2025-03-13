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
// productRouter.post(
//   "/",
//   authMiddleware,
//   upload.single("file"),
//   new ProductController().create,
// );
productRouter.post("/", authMiddleware, new ProductController().create);
productRouter.delete("/:id", authMiddleware, new ProductController().delete);
productRouter.put(
  "/:id",
  authMiddleware,
  upload.single("file"),
  new ProductController().update,
);
productRouter.patch(
  "/:id",
  authMiddleware,
  upload.single("file"),
  new ProductController().partialUpdate,
);

export default productRouter;
