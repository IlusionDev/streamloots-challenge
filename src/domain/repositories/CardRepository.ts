import CrudRepository from "@/domain/repositories/base/CrudRepository";
import { Card, ICard } from "@/domain/models/Card";
import { Query } from "mongoose";



export class CardRepository extends CrudRepository<ICard> {
    private static instance: CardRepository;

    static getInstance(model: any): CardRepository {
        if (!CardRepository.instance) {
            CardRepository.instance = new CardRepository(model);
        }
        return CardRepository.instance;
    }


    async upsert(cardId: string, userId: string, quantity = 0): Promise<any> {
        return Card.updateOne({ 'cards.id': cardId, userId: userId, }, { quantity: quantity }, { upsert: true });
    }

    async getCardsByUser(userId: string): Promise<ICard[]> {
        return Card.findOne({ userId: userId });
    }

    async obtained(cardId: string, quantity): Promise<Query<any, any, any, any>> {
        return Card.updateOne({ cardId: cardId }, { $inc: { quantity: quantity } });
    }

    async bulkPublishAction(cardIds: string[], streamerId: string, status: boolean): Promise<any> {
        return Card.updateMany({ '_id': { $in: cardIds }, userId: streamerId }, { published: status });
    }

    released(cardId: string, quantity: number) {
        return Card.updateOne({ cardId: cardId }, { $dec: { quantity: quantity } });
    }
}
