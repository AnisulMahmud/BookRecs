const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");
const protectRoute = require("../middleware/protectRoute");
const {
  addBook,
  getBooks,
  getBooksById,
  getTags
} = require("../controllers/book.controller");
const { createAndUpdateReview } = require("../controllers/review.controller");

// add a new book
router.post("/", addBook);

// get all book
router.get("/", getBooks);

// get all tags from all the book and return in an array
router.get('/tags', getTags);

router.get("/:id", protectRoute, getBooksById);

router.post("/:id", protectRoute, createAndUpdateReview);

module.exports = router;
