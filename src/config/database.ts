import mongoose from "mongoose";
import { envConfig } from "@/config/EnvConfig";

const connection = null;


export const databaseConnection = async () => {

  if (!connection) {
    return await mongoose.connect(envConfig.env.database.url);
  }

  return connection;
}
