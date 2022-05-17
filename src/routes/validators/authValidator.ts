import { checkSchema } from "express-validator";

export const authValidator = {
    login: checkSchema({
        email: {
            in: ['body'],
            isEmail: true,
            errorMessage: 'Invalid email'
        },
        password: {
            in: ['body'],
            isEmpty: {
                negated: true,
                errorMessage: 'Password is required'
            },
            errorMessage: 'Invalid password'
        }
    }),
}
