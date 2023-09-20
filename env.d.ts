export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "testing";
      // Development environment variables
      DB_TYPE_DEV: string;
      DB_HOST_DEV: string;
      DB_PORT_DEV: number;
      DB_NAME_DEV: string;
      DB_USER_DEV: string;
      DB_PASSWORD_DEV: string;
      SERVER_PORT_DEV: number;

      // Production environment variables
      DB_TYPE_PROD: string;
      DB_HOST_PROD: string;
      DB_PORT_PROD: number;
      DB_NAME_PROD: string;
      DB_USER_PROD: string;
      DB_PASSWORD_PROD: string;
      SERVER_PORT_PROD: number;

      // Testing environment variables
      DB_TYPE_TEST: string;
      DB_HOST_TEST: string;
      DB_PORT_TEST: string;
      DB_NAME_TEST: string;
      DB_USER_TEST: string;
      DB_PASSWORD_TEST: string;
      SERVER_PORT_TEST: number;

      // Cyber
      HASH_SALT: string;
      HASH_ALGORITHM: string;
      JWT_SECRET_KEY: string;

      // Api - Whois
      API_URL_WHOIS: string;
      API_KEY_WHOIS: string;
      API_LIMITED_DAY_WHOIS: string;
      API_LIMITED_REQUEST_DURATION_WHOIS: number;
      API_LIMITED_DURATION_WHOIS: number;

      // Api - Virus Total
      API_URL_VIRUS: string;
      API_KEY_VIRUS: string;
      API_LIMITED_DAY_VIRUS: number;
      API_LIMITED_DURATION_VIRUS: number;
      API_LIMITED_REQUEST_DURATION_VIRUS: number;
    }
  }
}
