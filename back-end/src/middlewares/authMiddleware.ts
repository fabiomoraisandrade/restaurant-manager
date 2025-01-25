import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { ApiError } from "../errors/apiError";

const validateToken = async (token) => {
  try {
    const userInfo = verify(token, process.env.JWT_SECRET);
    return userInfo;
  } catch (err) {
    return false;
  }
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authToken = req.headers.authorization;
  const token = authToken.split(" ")[1];

  if (!token) throw ApiError.unauthorized("Token not found");

  const validToken = await validateToken(token);

  if (!validToken) throw ApiError.unauthorized("Expired or invalid token");

  return next();
};
