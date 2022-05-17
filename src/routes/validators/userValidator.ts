import { checkSchema } from "express-validator";

export const userCardsValidator = {
    addUserCard: checkSchema({
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
    getObtainedCardsByStreamer: checkSchema({
        streamerId: {
            in: ["params"],
            isString: true,
            isEmpty: {
                errorMessage: "Streamer id is required",
            }
        }

    })
};

