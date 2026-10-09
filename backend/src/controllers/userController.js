import { db } from '../db/storage.js';
import { config } from '../config/config.js';

export const registerUser = (req, res) => {
  const { username, email, password, phone } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const data = db.read();
  const existing = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ message: "An account with this email already exists" });
  }

  const newUser = {
    userId: "usr_" + Date.now(),
    username: username || email.split("@")[0],
    email,
    password,
    role: 1,
    phone: phone || "",
    profilePicUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    createdAt: new Date().toISOString()
  };

  data.users.push(newUser);
  db.write(data);

  // Set Auth Cookie
  const token = "mock_jwt_token_" + newUser.userId;
  res.cookie(config.cookieName, token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: "lax"
  });

  const { password: _, ...userSafe } = newUser;
  return res.status(200).json({
    message: "Account registered successfully",
    payload: userSafe
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const data = db.read();
  let user = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    // Auto-create for friendly demo testing if password matches
    user = {
      userId: "usr_" + Date.now(),
      username: email.split("@")[0],
      email,
      password,
      role: 1,
      profilePicUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      createdAt: new Date().toISOString()
    };
    data.users.push(user);
    db.write(data);
  }

  const token = "mock_jwt_token_" + user.userId;
  res.cookie(config.cookieName, token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: "lax"
  });

  const { password: _, ...userSafe } = user;
  return res.status(200).json({
    message: "Login successful",
    payload: userSafe
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie(config.cookieName);
  return res.status(200).json({ message: "Logged out successfully" });
};

export const fetchUser = (req, res) => {
  const data = db.read();
  // If user recognized via auth middleware or default demo user
  const user = req.user || data.users[0];
  const { password: _, ...userSafe } = user;
  return res.status(200).json({
    message: "User fetched successfully",
    payload: userSafe
  });
};

export const updateProfile = (req, res) => {
  const data = db.read();
  const userId = req.user?.userId || data.users[0].userId;
  const index = data.users.findIndex(u => u.userId === userId);

  if (index !== -1) {
    const { username, phone, address, profilePicUrl } = req.body;
    if (username) data.users[index].username = username;
    if (phone) data.users[index].phone = phone;
    if (address) data.users[index].address = address;
    if (profilePicUrl) data.users[index].profilePicUrl = profilePicUrl;
    db.write(data);

    const { password: _, ...userSafe } = data.users[index];
    return res.status(200).json({
      message: "Profile updated successfully",
      payload: userSafe
    });
  }

  return res.status(404).json({ message: "User not found" });
};
