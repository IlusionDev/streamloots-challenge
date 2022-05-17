import jwt from 'jsonwebtoken';
import CRequest from "@/global/definitions/CRequest";
import { NextFunction, Response } from "express";
import ApiResponseService from "@/domain/services/ApiResponseService";
import { ErrorApi } from "@/global/errors/ErrorApi";
import { envConfig } from "@/config/EnvConfig";
import { UserWithRoles } from '@/global/definitions/User';

/**
 * SecurityService
 * @class SecurityService
 * @description Security service is responsible for authentication and authorization and all related security operations
 *
 */
export default class SecurityService {

    private static instance: SecurityService;

    static getInstance() {
        if (!SecurityService.instance) {
            SecurityService.instance = new SecurityService();
        }

        return SecurityService.instance;
    }

    /**
     * @description Generates a JWT token given a user
     * @param {UserWithRoles} user
     * @returns {Promise<string>}
     */
    generateJwtToken(user: UserWithRoles): Promise<string> {

        const payload = {
            sub: user.id,
            roles: user.roles
        };

        return jwt.sign(payload, envConfig.env.jwt.secret, {
            expiresIn: envConfig.env.jwt.expiresIn,
            issuer: envConfig.env.jwt.jwtIssuer,
            audience: envConfig.env.jwt.jwtAudience,
        });
    }

    /**
     * @description A middleware that checks if the user is authenticated and activated
     * @param {CRequest} req Custom request object
     * @param {Response} res Express response object
     * @param {NextFunction} next Express next function
     * @throws {ErrorApi}
     * @returns {void}
     */
    static jwtAuthMiddleware(req: CRequest, res: Response, next: NextFunction) {
        const apiResponseService = new ApiResponseService(req, res);
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return apiResponseService.generateAndSendErrorResponse(new ErrorApi("No token provided", 401));
        }

        const parts = authHeader.split(' ');

        if (parts.length !== 2) {
            return apiResponseService.generateAndSendErrorResponse(new ErrorApi("Token error", 401));
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            apiResponseService.generateAndSendErrorResponse(new ErrorApi("Token malformed", 401));
        }

        const decoded = jwt.decode(token);

        req.user = { id: decoded.userId };
        next();
    }

}
