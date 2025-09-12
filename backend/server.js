require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database"); // import sequelize instance

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send(" Backend is running!");
});


const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()
  .then(() => {
    console.log(" Database connected successfully");
    return sequelize.sync(); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" DB Connection Error:", err);
  });
