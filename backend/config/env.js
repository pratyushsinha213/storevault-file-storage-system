import { config } from "dotenv";

config({path: ".env"});

export const {
    PORT,
    MONGO_URI,
    JWT_SECRET_KEY,
    AWS_S3_BUCKET_NAME, AWS_S3_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY,
    REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD,
    GEMINI_AI_API_KEY
} = process.env;