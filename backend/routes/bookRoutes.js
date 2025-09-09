const express = require("express");
const router = express.Router();
const { addBook, getAllBooks, getSellerBooks } = require("../controllers/bookController");
const { authMiddleware, sellerOnly } = require("../middleware/authMiddleware");

router.get("/", getAllBooks);

router.post("/add", authMiddleware, sellerOnly, addBook);

router.get("/my-books", authMiddleware, sellerOnly, getSellerBooks);

module.exports = router;
