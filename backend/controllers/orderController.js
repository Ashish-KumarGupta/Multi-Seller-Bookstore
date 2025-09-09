const { Order, Book } = require("../models");

exports.placeOrder = async (req, res) => {
  try {
    const { book_id } = req.body;

    const book = await Book.findByPk(book_id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const order = await Order.create({
      buyer_id: req.user.id,
      seller_id: book.seller_id,
      book_id,
      status: "Pending",
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { seller_id: req.user.id },
      include: [{ model: Book, as: "book" }],
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { order_id, status } = req.body;

    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
