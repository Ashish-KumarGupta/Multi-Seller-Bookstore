const sequelize = require("../config/db");
const User = require("./user");
const Book = require("./book");
const Cart = require("./cart");
const Order = require("./order");


User.hasMany(Book, { foreignKey: "seller_id", as: "books" });
Book.belongsTo(User, { foreignKey: "seller_id", as: "seller" });

User.hasMany(Cart, { foreignKey: "buyer_id", as: "cartItems" });
Cart.belongsTo(User, { foreignKey: "buyer_id", as: "buyer" });

Book.hasMany(Cart, { foreignKey: "book_id", as: "cartEntries" });
Cart.belongsTo(Book, { foreignKey: "book_id", as: "book" });

User.hasMany(Order, { foreignKey: "buyer_id", as: "orders" });
Order.belongsTo(User, { foreignKey: "buyer_id", as: "buyer" });

User.hasMany(Order, { foreignKey: "seller_id", as: "sellerOrders" });
Order.belongsTo(User, { foreignKey: "seller_id", as: "seller" });

Book.hasMany(Order, { foreignKey: "book_id", as: "orders" });
Order.belongsTo(Book, { foreignKey: "book_id", as: "book" });

module.exports = {
  sequelize,
  User,
  Book,
  Cart,
  Order,
};
