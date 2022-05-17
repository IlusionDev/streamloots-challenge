import { ErrorApi } from "@/global/errors/ErrorApi";

export class ErrorCantDelete extends ErrorApi {
    constructor(message: string, statusCode?: number, showStack?: boolean) {
        super(`${message} is associated with a record and cannot be deleted.`, statusCode || 409, showStack);
    }
}
