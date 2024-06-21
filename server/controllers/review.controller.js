const Review = require("../models/review.model");
const Book = require("../models/book.model");

const createAndUpdateReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookId = req.params.id;

    const { rating, comment } = req.body;

    const review = new Review({
      user: userId,
      book: bookId,
      rating,
      comment,
    });

    const savedReview = await review.save();

    await Book.findByIdAndUpdate(bookId, {
      $push: { reviews: savedReview._id },
    });

    res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    console.log("error in createReview", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createAndUpdateReview };
