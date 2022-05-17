import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    id: String,
    name: String,
    rarity: String,
    image: String,
    limited: String,
    quantity: Number,
    published: Boolean,
    publishedAt: Date,
    userId: String,
});

export interface ICard {
    id: string;
    name: string;
    rarity: string;
    image: string;
    limited: string;
    quantity: number;
    published: boolean;
    publishedAt: Date;
    userId: string;
}

export const Card = mongoose.model('Card', cardSchema)
