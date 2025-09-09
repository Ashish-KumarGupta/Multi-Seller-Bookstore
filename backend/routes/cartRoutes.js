const express = require("express");
const router = express.Router();
const { addToCart, getCart } = require("../controllers/cartController");
const { authMiddleware, buyerOnly } = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, buyerOnly, addToCart);

router.get("/", authMiddleware, buyerOnly, getCart);

module.exports = router;
