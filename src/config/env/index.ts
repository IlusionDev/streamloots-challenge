export const ENVIORNMENT: any = {
    production: process.env.NODE_ENV === 'prod',
    development: process.env.NODE_ENV === 'dev',
    serviceName: process.env.SERVICE_NAME || 'test-service',
    port: process.env.PORT || 3000,
    database: {
        url: process.env.DATABASE_URL,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        jwtIssuer: process.env.JWT_ISSUER,
        jwtAudience: process.env.JWT_AUDIENCE

    },
    request: {
        search: {
            take: process.env.SEARCH_LIMIT || 30,
            skip: process.env.SEARCH_SKIP || 0,
            getTranslations: process.env.SEARCH_TRANSLATIONS || false
        }
    }
};
