import { Router } from "express";
import UserController from "../../controllers/v1/UserController";

const loginRouter = Router();

loginRouter.post("/", new UserController().login);

export default loginRouter;
