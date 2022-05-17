import ApiResponseDto from "@/domain/definitions/dto/ApiResponseDto";
import CRequest from "@/global/definitions/CRequest";
import { plainToClass } from "class-transformer";
import GenerateApiResponseOptions from "@/domain/definitions/GenerateApiResponseOptions";
import GenerateAndSendErrorResponseOptions from "@/domain/definitions/GenerateAndSendErrorResponseOptions";
import { Response } from "express";
import { ErrorApi } from "@/global/errors/ErrorApi";

/**
 * @class ApiResponseService
 * @description Service to generate and send standard API responses
 *
 */
export default class ApiResponseService {
    private req: CRequest;

    private res: Response;

    constructor(req: CRequest, res: Response) {
        this.req = req;
        this.res = res;
    }

    static getInstance(req: CRequest, res: Response): ApiResponseService {
        return new ApiResponseService(req, res);
    }

    /**
     * @description Generate and API stantard response
     * @param {any} data
     * @param {GenerateApiResponseOptions} options
     * @returns {ApiResponseDto}
     */
    generateApiResponse<T>(
        data: T,
        options?: GenerateApiResponseOptions
    ): ApiResponseDto {
        const apiResponse: ApiResponseDto = new ApiResponseDto();
        if (data) {
            if (options?.sanitize) {
                apiResponse.data = plainToClass(options.sanitize, data);
            } else {
                apiResponse.data = data;
            }
        }
        apiResponse.error = options?.error ? options.error : false;
        options?.message ? (apiResponse.message = options?.message) : null;
        apiResponse.statusCode = options?.statusCode || 200;
        apiResponse.stack = options?.stack;
        apiResponse.hasMore = options?.hasMore;
        apiResponse.take = options?.take;
        apiResponse.total = options?.total;
        apiResponse.skip = options?.skip;

        return apiResponse;
    }

    /**
     * @description Generate and error API stantard response with status code set to 500 and error set to true
     * @param {GenerateApiResponseOptions} options
     */
    generateApiErrorResponse(
        options?: GenerateApiResponseOptions
    ): ApiResponseDto {
        return this.generateApiResponse(null, {
            error: true,
            statusCode: 500,
            ...options,
        });
    }

    /**
     * @description Generate API stantard response and it sends to the client
     * @param {any} data
     * @param {GenerateApiResponseOptions} options
     */
    generateAndSendWithStatus(data: any, options?: GenerateApiResponseOptions) {
        const statusCode = options?.statusCode ? options.statusCode : 200;
        return this.res
            .status(statusCode)
            .send(this.generateApiResponse(data, options));
    }

    /**
     * @description Generate and error API stantard response and it sends to the client
     * @param error
     * @param options
     */
    generateAndSendErrorResponse(
        error: ErrorApi,
        options?: GenerateAndSendErrorResponseOptions
    ) {
        let statusCode: number = error?.statusCode
            ? error.statusCode
            : (500 as number);
        statusCode = options?.statusCode ? options.statusCode : statusCode;
        this.req.logger.error(
            error?.message || options?.message,
            error?.stack || ""
        );
        const stack = error.showStack || options?.showStack ? error.stack : undefined;

        return this.res.status(statusCode).send(
            this.generateApiResponse(null, {
                ...options,
                error: true,
                message: options?.message || error.message,
                statusCode,
                stack,
            })
        );
    }

    /**
     * @description This method can be used to catch exceptions, it can send a slack message and send a standard error response
     * @param {ErrorApi | Error} error Error to be Catched can be ErrorApi or Error
     * @param {GenerateAndSendErrorResponseOptions} options
     */
    catch(error: Error, options?: GenerateAndSendErrorResponseOptions) {

        if (error instanceof ErrorApi) {
            return this.generateAndSendErrorResponse(error, options);
        }


        return this.generateAndSendErrorResponse(new ErrorApi(error.message, 500, true));
    }
}
