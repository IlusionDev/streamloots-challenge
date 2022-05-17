import EventEmitter from "events";
import { UserCardsRepository } from "@/domain/repositories/UserCardsRepository";
import { CardService } from "@/domain/services/CardService";
import { Analitycs } from "@/services/Analitycs";

export const CardEvent = new EventEmitter()

CardEvent.on("create", (card) => {
    Analitycs.getInstance().trackEvent("card_created", {})
})

CardEvent.on("published", (card) => {
    Analitycs.getInstance().trackEvent("card_published", {})
})
