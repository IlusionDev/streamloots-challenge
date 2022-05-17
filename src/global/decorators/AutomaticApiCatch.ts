/**
 * @interface
 * @description Options that will be passed to the AutomaticApiCatch decorator to be used by response service.
 * @property {string} message The message that will be returned to the client.
 * @property {number} statusCode The status code that will be returned to the client.
 * @property {boolean} isError If true, the exception will be marked as erro in response.
 * @property {boolean} showStackTrace If true, the stack trace will be returned to the client.
 */
interface AutomaticApiCatchOptions {
    isError?: number;
    message?: string;
    statusCode?: number;
    showStackTrace?: boolean;
}

/**
 * Los parametros de entrada renplazaran los del error lanzado
 * @param {AutomaticApiCatchOptions} options
 */
export function ApiCatch({
                             isError,
                             message,
                             statusCode,
                             showStackTrace
                         }: AutomaticApiCatchOptions = {}): MethodDecorator {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                return await originalMethod.apply(this, args);
            } catch (error) {
               return this.req.apiResponseService.catch(error, {
                    statusCode,
                    message,
                    error: isError,
                    showStack: showStackTrace
                });
            }
        }
    }

}
