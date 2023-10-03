import dotenv from "dotenv";

dotenv.config();

type envOperatorType = "_DEV" | "_TEST" | "_PROD";

const EnvOperator = ():envOperatorType => {
    switch (process.env.NODE_ENV) {
      case "development":
        return "_DEV";
  
      case "testing":
        return "_TEST";
  
      case "production":
        return "_PROD";
  
      default:
        return "_DEV";
    }
  };
  
const DbConfig = (operator: envOperatorType) => {
  return {
    host: process.env[`DB_HOST${operator}`],
    port:process.env[`DB_PORT${operator}`],
    user: process.env[`DB_USER${operator}`],
    database: process.env[`DB_NAME${operator}`],
    password: process.env[`DB_PASSWORD${operator}`],
  }
};

const envOperator = EnvOperator()
const serverPort = process.env[`SERVER_PORT${envOperator}`]
const dbConfig = DbConfig(envOperator)

export default {
    dbConfig,
    serverPort
};