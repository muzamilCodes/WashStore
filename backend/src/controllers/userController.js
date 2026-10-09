const users = [
  {
    userId: "usr_default_01",
    username: "Alex Johnson",
    email: "alex@example.com",
    password: "password123",
    role: 1,
    profilePicUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
  }
];

export const registerUser = (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ message: "User already exists with this email" });
  }

  const newUser = {
    userId: "usr_" + Date.now(),
    username: username || email.split("@")[0],
    email,
    password,
    role: 1,
    profilePicUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
  };
  users.push(newUser);

  // Set auth cookie
  const token = "mock_jwt_token_" + newUser.userId;
  res.cookie("P7WebApi_Auth_Token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: "lax"
  });

  const { password: _, ...userSafe } = newUser;
  return res.status(200).json({
    message: "User registered successfully",
    payload: userSafe
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  let user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    // For demo/ease of testing, create user if not found
    user = {
      userId: "usr_" + Date.now(),
      username: email.split("@")[0],
      email,
      password,
      role: 1,
      profilePicUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
    };
    users.push(user);
  }

  const token = "mock_jwt_token_" + user.userId;
  res.cookie("P7WebApi_Auth_Token", token, {
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

export const fetchUser = (req, res) => {
  // Return current user
  const user = users[0];
  const { password: _, ...userSafe } = user;
  return res.status(200).json({
    message: "User fetched successfully",
    payload: userSafe
  });
};
