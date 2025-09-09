const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Book = sequelize.define("Book", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  image_url: { type: DataTypes.STRING }
});

Book.belongsTo(User, { foreignKey: "seller_id" });

module.exports = Book;
