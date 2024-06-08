const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 5001, () => {
  console.log(`server running on ${process.env.PORT}`);
});
