/**
 * IMPORTANT NOTE, this kind of validation generators
 * slows down the response time, so use it only when necessary or
 * in non-critical routes
 */

export function generateValidator(field: string, numberOfValidators = 80, inPlace = 'body', optional = true): any {
    const validators = {};

    for (let i = 0; i < numberOfValidators; i++) {
        validators[field + i] = {
            in: [inPlace],
            isBoolean: {
                errorMessage: `${field + i} must be a boolean`
            },
            toBoolean: true,
            optional,
        }
    }

    return validators;
}

export function generateIntegerValidators(fields: string[], inPlace = 'body', optional = true): any {
    const validators = {};

    for (const field of fields) {
        validators[field] = {
            in: [inPlace],
            isInt: {
                errorMessage: `${field} must be an integer`
            },
            toInt: true,
            optional,
        }
    }

    return validators;
}

export function generateStringValidators(fields: string[], inPlace = 'body', optional = true): any {
    const validators = {};

    for (const field of fields) {
        validators[field] = {
            in: [inPlace],
            isString: {
                errorMessage: `${field} must be a string`
            },
            optional,
        }
    }

    return validators;
}

export function generateBooleanValidators(fields: string[], inPlace = 'body', optional = true): any {
    const validators = {};

    for (const field of fields) {
        validators[field] = {
            in: [inPlace],
            isString: {
                errorMessage: `${field} must be a boolean`
            },
            optional,
        }
    }

    return validators;
}
