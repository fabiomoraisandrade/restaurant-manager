import { Router } from "express";
import UserController from "../../controllers/v1/UserController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const userRouter = Router();

userRouter.get("/", new UserController().findAll);
userRouter.get("/:id", authMiddleware, new UserController().getUserById);
userRouter.post("/", new UserController().create);
userRouter.delete("/:id", authMiddleware, new UserController().delete);
userRouter.put("/:id", authMiddleware, new UserController().update);
userRouter.patch("/:id", authMiddleware, new UserController().partialUpdate);

export default userRouter;
