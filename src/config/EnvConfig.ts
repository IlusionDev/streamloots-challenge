import { ENVIORNMENT } from "@/config/env";

class EnvConfig {

    public readonly env: any = ENVIORNMENT;

    // Environment class
    private static instance: EnvConfig;

    static getInstance(): EnvConfig {
        if (!EnvConfig.instance) {
            EnvConfig.instance = new EnvConfig();
        }
        return EnvConfig.instance;
    }

    isProduction(): boolean {
        return this.env.production;
    }

    isDevelopment(): boolean {
        return this.env.development;
    }

}

export const envConfig = EnvConfig.getInstance();
