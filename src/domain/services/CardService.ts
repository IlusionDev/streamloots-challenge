import { Card, ICard } from "@/domain/models/Card";
import { CardRepository } from "@/domain/repositories/CardRepository";
import { ErrorNotFound } from "@/global/errors/ErrorNotFound";
import { Query, UpdateWriteOpResult } from "mongoose";

export class CardService {
    private static instance: CardService;

    static getInstance() {
        if (!CardService.instance) {
            CardService.instance = new CardService();
        }

        return CardService.instance;
    }

    async createCard(card: ICard, userId: string): Promise<ICard> {
        const cardToStore = new Card({
            name: card.name,
            published: false,
            userId: userId,
            limited: card?.limited,
            quantity: card?.quantity,
            image: card?.image,
            rarity: card?.rarity
        })

        return await CardRepository.getInstance(Card).create(cardToStore);
    }

    async publishCard(cardId: string): Promise<ICard> {
        const card = await CardRepository.getInstance(Card).getOne({ '_id': cardId });

        if (!card) {
            throw new ErrorNotFound('Card');
        }

        if (!card?.limited || (!card?.quantity && !card?.limited) || !card?.name || !card?.image || !card?.rarity) {
            throw new Error('Incomplete card, please fill all the card properties');
        }

        return await CardRepository.getInstance(Card).update(card, { published: true });
    }

    publishAction(cardIds: string[], streamerId: string, status: boolean): Promise<UpdateWriteOpResult> {
        return CardRepository.getInstance(Card).bulkPublishAction(cardIds, streamerId, status);
    }

    async getCardByIdAndUserId(cardId: string, userId: string): Promise<ICard> {
        return await CardRepository.getInstance(Card).getOne({ '_id': cardId, userId: userId });
    }

    getCardsByUserId(userId: string): ICard[] {
        return CardRepository.getInstance(Card).getMany({ userId: userId });
    }


    async obtained(cardId: string, quantity = 1): Promise<Query<any, any, any, any>> {
        return await CardRepository.getInstance(Card).obtained(cardId, quantity);
    }

    released(cardId: string, quantity = 1): Query<UpdateWriteOpResult, any, any, any> {
        return CardRepository.getInstance(Card).released(cardId, quantity);
    }

    async canObtainCard(cardId: string, quantity: number): Promise<ICard | null> {
        const card = await CardRepository.getInstance(Card).getOne({ '_id': cardId, published: true });

        if (!card) {
            throw new ErrorNotFound('Card');
        }

        if (!card.limited) {
            return card;
        }

        return card.quantity >= quantity ? card : null;
    }

    async updateCardById(cardId: string, updateData: ICard): Promise<ICard> {
        const card = await CardRepository.getInstance(Card).getOne({ '_id': cardId, published: false });

        if (!card) {
            throw new ErrorNotFound('Card');
        }

        return await CardRepository.getInstance(Card).update({ '_id': cardId, published: false }, {
            name: updateData?.name,
            image: updateData?.image,
            rarity: updateData?.rarity,
            limited: updateData?.limited,
            quantity: updateData?.quantity
        });
    }
}
