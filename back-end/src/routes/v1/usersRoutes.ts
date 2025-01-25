import { Router } from "express";
import UserController from "../../controllers/v1/UserController";
import { authMiddleware } from "../../middlewares/authMiddleware";

const usersRouter = Router();

usersRouter.post("/", new UserController().create);
usersRouter.get("/", new UserController().findAll);
usersRouter.get("/:id", authMiddleware, new UserController().getUserDetails);

export default usersRouter;
