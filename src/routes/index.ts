import SecurityService from "@/domain/services/SecurityService";
import { Router } from "express";

import cardsRouter from "@/routes/cardsRouter";

const apiRouter = Router();

apiRouter.use('/cards', SecurityService.jwtAuthMiddleware, cardsRouter);

export default apiRouter;


