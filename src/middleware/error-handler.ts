import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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

  // Handle Prisma unique constraint violation
  if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
    customError.message = "User already exists!";
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  res
    .status(customError.statusCode)
    .json({ code: customError.statusCode, message: customError.message });
};

interface Error {
  message: string;
  name: string;
  statusCode?: number;
  code?: number;
}

