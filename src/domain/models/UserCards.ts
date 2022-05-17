import mongoose, { Schema } from "mongoose";

const userCardSchemas = new mongoose.Schema({
    userId: String,
    streamerId: String,
    cards: [{
        cardId: String,
        quantity: Number,
        used: Number
    }]
});

export interface IUserCards {
    userId: string;
    streamerId: string;
    cards: [{
        cardId: string;
        quantity: number;
        used: number;
    }]
}

export const UserCards = mongoose.model<IUserCards>('UserCards', userCardSchemas)
