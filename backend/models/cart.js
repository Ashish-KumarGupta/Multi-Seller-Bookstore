const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Book = require("./book");

const Cart = sequelize.define("Cart", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
});

Cart.belongsTo(User, { foreignKey: "buyer_id" });
Cart.belongsTo(Book, { foreignKey: "book_id" });

module.exports = Cart;
