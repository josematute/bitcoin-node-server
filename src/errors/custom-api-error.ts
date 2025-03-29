/**
 * CustomApiError extends the built-in Error class to create a custom error class that can be used to handle API errors.
 */
export class CustomApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

