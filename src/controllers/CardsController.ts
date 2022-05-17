import Controller from "@/controllers/base/Controller";
import { ApiCatch } from "@/global/decorators/AutomaticApiCatch";
import { CardService } from "@/domain/services/CardService";
import { ICard } from "@/domain/models/Card";
import { CardEvent } from "@/domain/events/CardsEvents";

/**
 * @class CardsController
 * @extends Controller
 * @description This controller is responsible for card related operations
 */
export class CardsController extends Controller {


    @ApiCatch()
    public async createCard() {
        const card = await CardService.getInstance().createCard(this.req.body as unknown as ICard, this.req.user.id);

        CardEvent.emit('created', card);

        return this.req.apiResponseService.generateAndSendWithStatus(card);
    }

    @ApiCatch()
    public async publishCard() {
        const { cardId } = this.req.params;
        const card = await CardService.getInstance().publishCard(cardId);

        CardEvent.emit('published', card);

        return this.req.apiResponseService.generateAndSendWithStatus(card);
    }

    @ApiCatch()
    public async publishBulkActions() {
        const { ids, status } = this.req.body;
        const card = await CardService.getInstance().publishAction(ids, this.req.user.id, status);

        CardEvent.emit(status ? 'published' : 'unpublished', ids);

        return this.req.apiResponseService.generateAndSendWithStatus(card);
    }

    @ApiCatch()
    public async getCards() {
        const cards = CardService.getInstance().getCardsByUserId(this.req.user.id);

        return this.req.apiResponseService.generateAndSendWithStatus(cards);
    }

    @ApiCatch()
    update() {
        const { cardId } = this.req.params;
        const card = CardService.getInstance().updateCardById(cardId, this.req.body as unknown as ICard);

        return this.req.apiResponseService.generateAndSendWithStatus(card);
    }
}
