import { Logger } from "winston";
import ApiResponseService from "@/domain/services/ApiResponseService";
import { Request } from "express";
import { SlackErrorMessageService } from "@/services/errorManagers/SlackErrorMessageService";
import { IntUser } from "@prisma/client";

/**
 * @interface
 * @description This interface is used to define the custom request object
 * @extends {Request}
 */
export default interface CRequest extends Request {
    apiResponseService: ApiResponseService;
    file: any; // TODO change to file type
    user: IntUser ;
    req: Request;
    logger: Logger;
    async
    rawBody: string;
    slackAlerts: SlackErrorMessageService
}
