const express = require("express");
const router = express.Router();
const { placeOrder, getSellerOrders, updateOrderStatus } = require("../controllers/orderController");
const { authMiddleware, sellerOnly, buyerOnly } = require("../middleware/authMiddleware");

router.post("/place", authMiddleware, buyerOnly, placeOrder);

router.get("/seller", authMiddleware, sellerOnly, getSellerOrders);

router.put("/update", authMiddleware, sellerOnly, updateOrderStatus);

module.exports = router;
