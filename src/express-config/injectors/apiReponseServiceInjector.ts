import { Response } from "express";
import ApiResponseService from "@/domain/services/ApiResponseService";
import CRequest from "@/global/definitions/CRequest";

export function apiReponseServiceInjector (req: CRequest, res: Response) {
    req.apiResponseService = ApiResponseService.getInstance(req, res)
}
