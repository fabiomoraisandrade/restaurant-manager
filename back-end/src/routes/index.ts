import { Router } from "express";
import userV1Router from "./v1/userRoutes";
import loginV1Router from "./v1/loginRoutes";
import categoryV1Router from "./v1/categoryRoutes";
import productV1Router from "./v1/productRoutes";
import orderV1Router from "./v1/orderRoutes";
import orderItemV1Router from "./v1/orderItemRoutes";

const routes = Router();

routes.use("/api/v1/users", userV1Router);
routes.use("/api/v1/login", loginV1Router);
routes.use("/api/v1/category", categoryV1Router);
routes.use("/api/v1/product", productV1Router);
routes.use("/api/v1/order", orderV1Router);
routes.use("/api/v1/orderItem", orderItemV1Router);

export default routes;
