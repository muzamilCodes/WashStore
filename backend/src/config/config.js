import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5095,
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'swashbuckle_secret_key',
  cookieName: process.env.COOKIE_NAME || 'P7WebApi_Auth_Token',
  allowedOrigins: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174'
  ]
};
