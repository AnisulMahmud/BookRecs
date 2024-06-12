import Review from "../models/review.model";

const createReview = async (req, res) => {
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

    await review.save();
    s;
    res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    console.log("error in createReview", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createReview };
