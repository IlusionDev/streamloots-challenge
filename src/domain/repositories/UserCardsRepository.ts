import CrudRepository from "@/domain/repositories/base/CrudRepository";
import { IUserCards, UserCards } from "@/domain/models/UserCards";
import { HydratedDocument, QueryWithHelpers, UpdateWriteOpResult } from "mongoose";
import { ICard } from "@/domain/models/Card";


export class UserCardsRepository extends CrudRepository<IUserCards> {
    private static instance: UserCardsRepository;

    static getInstance(model: any): UserCardsRepository {
        if (!UserCardsRepository.instance) {
            UserCardsRepository.instance = new UserCardsRepository(model);
        }
        return UserCardsRepository.instance;
    }

    getAllUserCards(userId: string, streamerId: string): QueryWithHelpers<Array<HydratedDocument<IUserCards, any, any>>, HydratedDocument<IUserCards, any, any>, any, IUserCards> {
        return UserCards.find({ userId, streamerId });
    }

    async addQuantityUserCard(userId: string, streamerId: string, cardId: string, quantity = 1): Promise<QueryWithHelpers<UpdateWriteOpResult, HydratedDocument<IUserCards, any, any>, any, IUserCards>> {
        return UserCards.updateOne({ userId, streamerId, "cards.cardId": cardId }, {
            $inc: {
                "cards.$.quantity": quantity
            }
        });
    }

    async addUserCard(userId: string, card: ICard, quantity = 1): Promise<QueryWithHelpers<UpdateWriteOpResult, HydratedDocument<IUserCards, any, any>, any, IUserCards>> {
        const userCard = await UserCards.findOne({ userId, streamerId: card.userId, "cards.cardId": card.id });

        if (userCard) {
            return await this.addQuantityUserCard(userId, card.userId, card.id);
        }

        return UserCards.updateOne({ userId, streamerId: card.userId }, {
            $push: {
                cards: [{
                    cardId: card.id,
                    quantity
                }]
            }
        }, { upsert: true });
    }

    useCard(userId, streamerId, cardId): QueryWithHelpers<UpdateWriteOpResult, HydratedDocument<IUserCards, any, any>, any, IUserCards> {
        return UserCards.updateOne({ userId, streamerId, "cards.cardId": cardId }, {
            $dec: {
                "cards.$.quantity": 1
            },
            $inc: {
                "cards.$.used": 1
            }
        });
    }
}
