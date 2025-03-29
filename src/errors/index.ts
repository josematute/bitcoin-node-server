/**
 * This re-exports the custom error classes from their respective files, using the export keyword. 
 * So in a way this is re-exposing these symbols, by simultaneously importing and exporting them. 
 * Now any other file in the TS app can import our “src/errors/index.ts” file and get access to all 
 * the re-exported symbols.
 */
export { CustomApiError } from "./custom-api-error";
export { UnauthorizedError } from "./unauthorized-error";
export { BadRequestError } from "./bad-request-error";