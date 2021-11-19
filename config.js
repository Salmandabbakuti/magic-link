require('dotenv').config();

const appUrl = process.env.APP_URL;
const jwtSecret = process.env.JWT_SECRET;

const databaseConfig = {
  dbUri: process.env.MONGODB_URI
};

const sesConfig = {
  senderEmail: process.env.SES_SENDER_EMAIL,
  region: process.env.SES_REGION
};

export { appUrl, jwtSecret, databaseConfig, sesConfig };
