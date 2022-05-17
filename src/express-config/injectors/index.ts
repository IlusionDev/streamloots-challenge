import { apiReponseServiceInjector } from "@/express-config/injectors/apiReponseServiceInjector";
import { winstonInjector } from "@/express-config/injectors/winstonInjector";
import CRequest from "@/global/definitions/CRequest";
import { NextFunction, Response } from 'express';

export function loadInjectors (req: CRequest, res: Response, next: NextFunction) {
    apiReponseServiceInjector(req, res);
    winstonInjector(req, res);
    next();
}
