require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));


sequelize.sync().then(() => {
  console.log("Database connected successfully");
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
}).catch((err) => console.log("DB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("🚀 Multi-Seller Bookstore Backend is Running Successfully!");
});
app.get('/health', (req, res) => res.send('ok'));