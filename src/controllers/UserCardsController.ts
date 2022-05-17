import Controller from "@/controllers/base/Controller";
import { ApiCatch } from "@/global/decorators/AutomaticApiCatch";
import { UserCardsService } from "@/domain/services/UserCardsService";
import { UserCardsEvents } from "@/domain/events/UserCardsEvents";

/**
 * @class CardsController
 * @extends Controller
 * @description This controller is responsible for userCards related operations
 */
export class UserCardsController extends Controller {

    @ApiCatch()
    public async addUserCard() {
        const { streamerId } = this.req.params

        const userCard = await UserCardsService.getInstance().addUserCard(streamerId, this.req.user.id, this.req.body.cardId)

        UserCardsEvents.emit('obtained', this.req.body.cardId)

        return this.req.apiResponseService.generateAndSendWithStatus(userCard)
    }


    @ApiCatch()
    public async getAllUserCardsByStreamer() {
        const { streamerId } = this.req.params

        const userCards = await UserCardsService.getInstance().getCardsByUserIdAndStreamerId(streamerId, this.req.user.id)

        return this.req.apiResponseService.generateAndSendWithStatus(userCards)
    }

    @ApiCatch()
    public async getAllUserCardsByUserId() {
        const { streamerId } = this.req.params

        const userCards = await UserCardsService.getInstance().getCardsByUserId(this.req.user.id)

        return this.req.apiResponseService.generateAndSendWithStatus(userCards)
    }



}
