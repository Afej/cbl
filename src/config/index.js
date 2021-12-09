const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./src/config/.env" });

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiry: process.env.JWT_EXPIRY,
  jwt_cookie_expiry: process.env.JWT_COOKIE_EXPIRY,
};
