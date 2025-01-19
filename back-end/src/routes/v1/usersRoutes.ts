import { Router } from "express";
import UserController from "../../controllers/v1/UserController";

const usersRouter = Router();

usersRouter.post("/", new UserController().create);
usersRouter.get("/", new UserController().findAll);

export default usersRouter;
