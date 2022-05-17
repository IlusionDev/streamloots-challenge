
export const commonValidators = {
    search: {
        take: {
            in: ["query"],
            isInt: true,
            optional: true,
            toInt: true,
            errorMessage: "take must be an integer",
        },
        skip: {
            in: ["query"],
            isInt: true,
            optional: true,
            toInt: true,
            errorMessage: "skip must be an integer",
        },
        getTranslations: {
            in: ["query"],
            isBoolean: true,
            toBoolean: true,
            optional: true,
            errorMessage: "getTranslations must be a boolean",
        },
    }
}
