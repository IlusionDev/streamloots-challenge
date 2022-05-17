import { checkSchema } from "express-validator";

export const cardsValidator = {
    create: checkSchema({
        cardId: {
            isString: true,
            isLength: {
                options: { min: 1 },
            },
            isEmpty: {
                errorMessage: "Streamer id is required",
            }
        }
    }),
    update: checkSchema({
        cardId: {
            in: ['params'],
            isString: true,
            isLength: {
                options: { min: 1 },
            },
            isEmpty: {
                errorMessage: "Streamer id is required",
            }
        },
        name: {
            in: ['body'],
            isString: true,
            isLength: {
                options: { min: 1 },
            },
            optional: true,
        },
        limited: {
            in: ['body'],
            isBoolean: true,
            toBoolean: true,
            optional: true,
        },
        quantity: {
            in: ['body'],
            isInt: true,
            toInt: true,
            optional: true,
        },
    }),
    publish: checkSchema({
        cardId: {
            in: ['params'],
            isString: true,
            isLength: {
                options: { min: 1 },
            },
            isEmpty: {
                errorMessage: "CardId id is required",
            }
        },
    })
};

