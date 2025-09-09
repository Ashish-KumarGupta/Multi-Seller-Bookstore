const { Book, User } = require("../models");

exports.addBook = async (req, res) => {
  try {
    const { title, description, price, stock, image_url } = req.body;

    const book = await Book.create({
      title,
      description,
      price,
      stock,
      image_url,
      seller_id: req.user.id,
    });

    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [{ model: User, as: "seller", attributes: ["id", "name", "email"] }],
    });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSellerBooks = async (req, res) => {
  try {
    const books = await Book.findAll({ where: { seller_id: req.user.id } });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
