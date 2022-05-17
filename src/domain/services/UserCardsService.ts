import { Card, ICard } from "@/domain/models/Card";
import { CardRepository } from "@/domain/repositories/CardRepository";
import { ErrorNotFound } from "@/global/errors/ErrorNotFound";
import { UserCardsRepository } from "@/domain/repositories/UserCardsRepository";
import { IUserCards, UserCards } from "@/domain/models/UserCards";
import { HydratedDocument, QueryWithHelpers, UpdateWriteOpResult } from "mongoose";
import { CardService } from "@/domain/services/CardService";

export class UserCardsService {
    private static instance: UserCardsService;

    static getInstance() {
        if (!UserCardsService.instance) {
            UserCardsService.instance = new UserCardsService();
        }

        return UserCardsService.instance;
    }

    async addUserCard(streamerId: string, userId: string, cardId: string, quantity = 1): Promise<QueryWithHelpers<UpdateWriteOpResult, HydratedDocument<IUserCards, any, any>, any, IUserCards>> {
        const cardService = CardService.getInstance();
        const card = await cardService.canObtainCard(cardId, quantity);
        await cardService.obtained(cardId, quantity);

        try {
            return await UserCardsRepository.getInstance(UserCards).addUserCard(userId, card, quantity);
        } catch (error) {
            await cardService.released(cardId, quantity);
            throw error
        }
    }


    async getCardsByIdAndUserId(cardId: string, userId: string): Promise<ICard> {
        return await CardRepository.getInstance(Card).getOne({ id: cardId, userId: userId });
    }

    async getCardsByUserId(userId: string): Promise<IUserCards[]> {
        return UserCardsRepository.getInstance(UserCards).getMany({ userId: userId });
    }

    async getCardsByUserIdAndStreamerId(streamerId: string, userId: string): Promise<IUserCards[]> {
        return UserCardsRepository.getInstance(UserCards).getMany({ userId: userId, streamerId: streamerId });
    }

    useCard(userId, streamerId, cardId) {
        return UserCardsRepository.getInstance(UserCards).useCard(userId, streamerId, cardId);
    }


}
