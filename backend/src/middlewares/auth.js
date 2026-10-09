import { config } from '../config/config.js';
import { db } from '../db/storage.js';

export const authenticate = (req, res, next) => {
  const token = req.cookies[config.cookieName] || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    // If auth token missing, allow fetching or pass along with null user
    req.user = null;
    return next();
  }

  const data = db.read();
  const userId = token.replace('mock_jwt_token_', '');
  const user = data.users.find(u => u.userId === userId || token.includes(u.userId)) || data.users[0];

  req.user = user || null;
  next();
};

export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required. Please log in." });
  }
  next();
};
