import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../errors/apiError";

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  console.error(err);
  let message = err.message;

  if (err instanceof ApiError) {
    message = message.replace(/\"/g, "");
    return res.status(err.statusCode).json({ message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error!",
  });
};
