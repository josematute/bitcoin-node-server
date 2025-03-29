import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./custom-api-error";

/**
 * BadRequestError extends the CustomApiError class to create a custom error class that can be used to handle bad request errors.
 */
export class BadRequestError extends CustomApiError {
  constructor(message: string = "Bad Request") {
    super(message, StatusCodes.BAD_REQUEST);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}