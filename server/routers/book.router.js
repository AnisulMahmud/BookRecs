const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");
const { addBook, getBooks } = require("../controllers/book.controller");

// add a new book
router.post("/", addBook);

// get all book
router.get("/", getBooks);

module.exports = router;
