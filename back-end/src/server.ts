import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import path from "path";
import fileUpload from "express-fileupload";

const app = express();

app.use(cors());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }),
);
app.use(express.json());
app.use(routes);
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));
app.use(errorMiddleware);

app.listen(3333, () => {
  console.log("Server running at port 3333!");
});
