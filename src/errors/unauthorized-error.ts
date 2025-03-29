import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./custom-api-error";

/**
 * UnauthorizedError extends the CustomApiError class to create a custom error class that can be used to handle unauthorized errors.
 */
export class UnauthorizedError extends CustomApiError {
  constructor(message: string = "Invalid Credentials") {
    super(message, StatusCodes.UNAUTHORIZED);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

