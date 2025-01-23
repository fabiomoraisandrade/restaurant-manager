import { Router } from "express";
import usersV1Router from "./v1/usersRoutes";
import loginV1Router from "./v1/loginRoutes";

const routes = Router();

routes.use("/api/v1/users", usersV1Router);
routes.use("/api/v1/login", loginV1Router);

export default routes;
