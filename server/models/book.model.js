const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  publishedDate: { type: Date },
  pdf: { type: String },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }], // TODO: Review model
});

module.exports = mongoose.model("Book", BookSchema);
