/**
 * @interface
 * @description Options for generating an API response.
 * @property {number} statusCode The status code to use in the response.
 * @property {string} message The message to use in the response.
 * @property {boolean} error Mark the response as error type response.
 * @property {any} data The data to use in the response, usually used to respond with any kind of data.
 * @property {stack} stack The stack to use in the response.
 * @property {number} take The number of items to take from the server pagination.
 * @property {number} skip The number of items to skip from the server pagination.
 * @property {number} page The total of items available.
 */
export default interface GenerateApiResponseOptions {
    error?: boolean;
    message?: string;
    sanitize?: any;
    statusCode?: number;
    stack?: string;
    hasMore?: boolean;
    take?: number;
    skip?: number;
    total?: number;
}
