import { Router } from "express";
import userV1Router from "./v1/userRoutes";
import loginV1Router from "./v1/loginRoutes";
import categoryV1Router from "./v1/categoryRoutes";

const routes = Router();

routes.use("/api/v1/users", userV1Router);
routes.use("/api/v1/login", loginV1Router);
routes.use("/api/v1/category", categoryV1Router);

export default routes;
