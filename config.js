require("dotenv").config();
const env = require("env-var");

const envs = {
  PORT: env.get("PORT").required().asPortNumber() || 3000,
  // Mongo DB
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  MONGO_USER: env.get("MONGO_USER").required().asString(),
  MONGO_PASS: env.get("MONGO_PASSWORD").required().asString(),
  SECRET_KEY: env.get("SECRET_KEY").required().asString(),
};
module.exports = envs;
