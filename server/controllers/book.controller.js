const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");

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
    const books = await Book.find().populate("reviews");
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { addBook, getBooks };
