import winston from 'winston';
import { envConfig } from "@/config/EnvConfig";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: envConfig.env.serviceName },
    transports: [
        new winston.transports.Console({ format: winston.format.simple() })
    ],
});

export default logger;
