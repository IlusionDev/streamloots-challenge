import { NextFunction, Response } from 'express';
import CRequest from "@/global/definitions/CRequest";

export default class Controller {
    protected req: CRequest;
    protected res: Response;
    protected next: NextFunction;

    constructor(req, res) {
        this.req = req;
        this.res = res;
    }


}
