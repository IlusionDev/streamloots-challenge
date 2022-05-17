/**
 * @interface
 * @description Options for generating and sending an error response.
 * @property {string} message - The error message.
 * @property {number} statusCode - The HTTP status code.
 * @property {boolean} showStack - Whether to show the stack trace.
 * @property {boolean} error - Mark if the response is of type error.
 */
export default interface GenerateAndSendErrorResponseOptions {
    error?: boolean;
    message?: string;
    sanitize?: any;
    statusCode?: number;
    showStack?: boolean;
}
