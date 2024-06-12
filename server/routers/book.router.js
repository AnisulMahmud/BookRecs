const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");
import protectRoute from "../middleware/protectRoute";
const {
  addBook,
  getBooks,
  getBooksById,
} = require("../controllers/book.controller");
const { createReview } = require("../controllers/review.controller");

// add a new book
router.post("/", addBook);

// get all book
router.get("/", getBooks);

router.get("/:id", protectRoute, getBooksById);

router.post("/books/:id/reviews", protectRoute, createReview);

module.exports = router;
