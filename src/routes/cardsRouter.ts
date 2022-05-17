import { Router } from 'express';
import { CardsController } from "@/controllers/CardsController";
import CRequest from "@/global/definitions/CRequest";
import { userCardsValidator } from "@/routes/validators/userValidator";
import { errorValidatorMiddleware } from "@/express-config/middlewares/validators/errorsExpressValidatorMiddleware";
import { UserCardsController } from "@/controllers/UserCardsController";
import { cardsValidator } from "@/routes/validators/cardsValidator";

const cardsRouter = Router();

cardsRouter.post('/', cardsValidator.create, errorValidatorMiddleware, (req: CRequest, res) => new CardsController(req, res).createCard());
cardsRouter.patch('/:cardId', cardsValidator.update, errorValidatorMiddleware, (req: CRequest, res) => new CardsController(req, res).update());
cardsRouter.patch('/publish/:cardId', cardsValidator.publish, errorValidatorMiddleware, (req: CRequest, res) => new CardsController(req, res).publishCard());
cardsRouter.get('/', (req: CRequest, res) => new CardsController(req, res).getCards());

cardsRouter.get('/obtained/:streamerId', userCardsValidator.getObtainedCardsByStreamer, errorValidatorMiddleware, (req: CRequest, res) => new UserCardsController(req, res).getAllUserCardsByStreamer());
cardsRouter.get('/obtained', (req: CRequest, res) => new UserCardsController(req, res).getAllUserCardsByUserId());


cardsRouter.post('/:streamerId', (req: CRequest, res) => new UserCardsController(req, res).addUserCard());


export default cardsRouter;
