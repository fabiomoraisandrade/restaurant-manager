import { Router } from "express";
import usersV1Router from "./v1/usersRoutes";

const routes = Router();

routes.use("/api/v1/users", usersV1Router);

export default routes;
