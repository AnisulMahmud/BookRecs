const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");
const { default: mongoose } = require("mongoose");

const addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const book = await newBook.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate({
      path: "reviews",
      populate: {
        path: "user",
        model: "User",
        select: "name",
      },
    });
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getBooksById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No book with that id");
  }

  try {
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log("error in getBooksById", error.message);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

const getTags = async (req, res) => {
  try {
    const tagsAggregation = await Book.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: null, tags: { $addToSet: "$tags" } } },
      { $project: { _id: 0, tags: 1, totalTags: { $size: "$tags" } } }
    ]);

    if (tagsAggregation.length > 0) {
      res.status(200).json(tagsAggregation[0]);
    } else {
      res.status(200).json({ tags: [], totalTags: 0 });
    }
  } catch (error) {
    console.error('Error fetching tags:', error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { addBook, getBooks, getBooksById, getTags };
