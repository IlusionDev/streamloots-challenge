/**
 * @class ErrorApi
 * @description Error class for API errors, inherits from Error
 * @extends {Error}
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {string} showStack - Whether to show the stack trace in the response
 * @constructor
 */
export class ErrorApi extends Error {
  statusCode: number;
  showStack: boolean;

  constructor(message: string, statusCode: number, showStack = false) {
    super(message);
    this.statusCode = statusCode;
    this.showStack = showStack;
  }
}

