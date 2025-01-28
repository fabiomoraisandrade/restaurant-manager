import { Router } from "express";
import UserController from "../../controllers/v1/UserController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const userRouter = Router();

userRouter.get("/", new UserController().findAll);
userRouter.get("/:id", authMiddleware, new UserController().getUserById);
userRouter.post("/", new UserController().create);

export default userRouter;
