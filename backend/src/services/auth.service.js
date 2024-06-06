const jwt = require("jsonwebtoken");
const axios = require("axios");
const https = require("https");
const bcrypt = require("bcrypt");
const db = require("../database/sakila.config");

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (username, password, name) => {
  try {
    const existingUser = await db("mst_user").where({ username }).first();
    if (existingUser) {
      return { success: false, message: "Username already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db("mst_user").insert({
      username,
      password: hashedPassword,
      role_id: 3,
      name,
    });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Registration failed" };
  }
};

const login = async (username, password) => {
  try {
    const user = await db("mst_user").where({ username }).first();
    if (!user) {
      return { success: false, message: "Invalid username or password" };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { success: false, message: "Invalid username or password" };
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return { success: true, token };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Login failed" };
  }
};

const loginAPI = async (username, password) => {
  let res = await axios
    .post(
      process.env.AUTH_URL,
      { username, password },
      { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
    )
    .catch((err) => console.log(err));
  if (res.status) {
    return res.data;
  } else {
    return false;
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, SECRET_KEY, { expiresIn: "24h" });
};

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) token = token.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ error: "Failed to authenticate token" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  register,
  login,
  generateToken,
  verifyToken,
  loginAPI,
};
