import { NextFunction, Response } from "express";
import { searchQueryStandard } from "@/express-config/middlewares/request/searchQueryStandard";
import CRequest from "@/global/definitions/CRequest";

export function middlewareLoader(req: CRequest, res: Response, next: NextFunction) {
    searchQueryStandard(req, res, next);

    next();
}
