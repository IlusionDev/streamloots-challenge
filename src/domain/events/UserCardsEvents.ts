import EventEmitter from "events";
import { Analitycs } from "@/services/Analitycs";

export const UserCardsEvents = new EventEmitter()

UserCardsEvents.on("create", (userId, cardId, quantity = 1) => {
    Analitycs.getInstance().trackEvent("user_card_obtained", {})
})
