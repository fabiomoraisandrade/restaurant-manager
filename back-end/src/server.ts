import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

app.listen(3333, () => {
  console.log("Server running at port 3333!");
});
