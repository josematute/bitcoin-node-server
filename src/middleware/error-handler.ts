import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let customError = {
    message: err.message,
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  console.log("[errorHandlerMiddleware] err.message", err.message);
  console.log("[errorHandlerMiddleware] err.statusCode", err.statusCode);
  console.log("[errorHandlerMiddleware] customError about to be sent", customError);

  res.status(customError.statusCode).json({
    code: customError.statusCode,
    message: customError.message
  });
};

interface Error {
  message: string;
  name: string;
  statusCode?: number;
  code?: number;
}
