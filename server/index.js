const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoutes = require("./routers/auth.router");
const bookRoutes = require("./routers/book.router");

app.use("/api/auth", authRoutes);
//app.use("/api/books", bookRoutes);

app.use("/", (req, res) => {
  res.send("Hello World!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5001, () => {
      console.log(`server running on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
