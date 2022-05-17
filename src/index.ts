import 'reflect-metadata'
import 'tsconfig-paths/register'
import dotenv from "dotenv"
dotenv.config();

import { databaseConnection } from "@/config/database"


databaseConnection().then(() => {
        import('@/express-config')
    }
)



