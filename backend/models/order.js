const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Book = require("./book");

const Order = sequelize.define("Order", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  status: { type: DataTypes.ENUM("Pending", "Shipped"), defaultValue: "Pending" }
});

Order.belongsTo(User, { foreignKey: "buyer_id" });
Order.belongsTo(User, { foreignKey: "seller_id" });
Order.belongsTo(Book, { foreignKey: "book_id" });

module.exports = Order;
