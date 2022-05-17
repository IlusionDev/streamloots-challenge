import { ErrorApi } from "@/global/errors/ErrorApi";

export class ErrorNotFound extends ErrorApi {
    constructor(message: string, status = 404) {
        super(`${message} not found`, status);
    }
}
