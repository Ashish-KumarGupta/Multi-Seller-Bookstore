const { Cart, Book } = require("../models");

exports.addToCart = async (req, res) => {
  try {
    const { book_id, quantity } = req.body;

    const cartItem = await Cart.create({
      buyer_id: req.user.id,
      book_id,
      quantity,
    });

    res.status(201).json({ message: "Added to cart", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { buyer_id: req.user.id },
      include: [{ model: Book, as: "book" }],
    });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
