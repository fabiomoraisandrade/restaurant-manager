import { Router } from "express";
import UserController from "../controllers/UserController";

const usersRouter = Router();

usersRouter.post("/", new UserController().create);
usersRouter.get("/", new UserController().findAll);

export default usersRouter;
