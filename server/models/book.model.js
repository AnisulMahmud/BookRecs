const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  publishedDate: { type: Date },
  pdf: { type: String },
  genres: { type: String },
  tags: { type: [String] },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model("Book", BookSchema);
