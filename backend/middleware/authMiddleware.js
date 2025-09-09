const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);

    if (!req.user) {
      return res.status(404).json({ message: "User not found." });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

const sellerOnly = (req, res, next) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Access denied. Sellers only." });
  }
  next();
};

const buyerOnly = (req, res, next) => {
  if (req.user.role !== "buyer") {
    return res.status(403).json({ message: "Access denied. Buyers only." });
  }
  next();
};

module.exports = { authMiddleware, sellerOnly, buyerOnly };
