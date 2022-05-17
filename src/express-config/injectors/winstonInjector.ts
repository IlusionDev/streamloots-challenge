import CRequest from "@/global/definitions/CRequest";
import logger from "@/config/winston";
import { Response } from "express";

export function winstonInjector(
    req: CRequest,
    res: Response,
) {
    req.logger = logger;
}
