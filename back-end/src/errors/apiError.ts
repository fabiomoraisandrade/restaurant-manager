import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, status: number) {
    super(message);
    this.statusCode = status;
    // Object.setPrototypeOf(this, new.target.prototype); // Corrige instanceof em TypeScript
    // Error.captureStackTrace(this);
  }

  static badRequest(message: string): ApiError {
    return new ApiError(message, StatusCodes.BAD_REQUEST);
  }

  static notFound(message: string): ApiError {
    return new ApiError(message, StatusCodes.NOT_FOUND);
  }

  static conflict(message: string): ApiError {
    return new ApiError(message, StatusCodes.CONFLICT);
  }

  static unauthorized(message: string): ApiError {
    return new ApiError(message, StatusCodes.UNAUTHORIZED);
  }
}
