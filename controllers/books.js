const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getBooks = async (req, res) => {
  // #swagger.tags = ["Books"]
  // #swagger.summary = "Get all books"
  try {
    const result = await mongodb.getDb().db().collection("Books").find();
    result.toArray().then((books) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(books);
    });
  } catch (error) {
    res
      .status(500)
      .json(error || "Some error occurred while fetching the books.");
  }
};

const getBook = async (req, res) => {
  // #swagger.tags = ["Books"]
  // #swagger.summary = "Get a book by ID"
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid book id to find a book." });
    }
    const bookId = new ObjectId(req.params.id);
    if (!bookId) {
      res.status(500).json("Book ID not found.");
    }
    const result = await mongodb
      .getDb()
      .db()
      .collection("Books")
      .findOne({ _id: bookId });
    if (!result) {
      res.status(404).json("Book not found.");
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    }
  } catch (error) {
    res
      .status(500)
      .json(error || "Some error occurred while fetching the book.");
  }
};

const createBook = async (req, res) => {
  // #swagger.tags = ["Books"]
  // #swagger.summary = "Create a new book"
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      categoryCode: req.body.categoryCode,
      description: req.body.description,
      isbn: req.body.isbn,
      price: req.body.price,
      publisher: req.body.publisher,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("Books")
      .insertOne(book);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json("Some error occurred while creating the book.");
    }
  } catch (error) {
    res.status(500).json(error || "An unexpected error occurred.");
  }
};

const updateBook = async (req, res) => {
  // #swagger.tags = ["Books"]
  // #swagger.summary = "Update a book by ID"
  try {
    const bookId = new ObjectId(req.params.id);
    if (!bookId) {
      res.status(500).json("Book ID not found.");
    }
    const book = {
      title: req.body.title,
      author: req.body.author,
      categoryCode: req.body.categoryCode,
      description: req.body.description,
      isbn: req.body.isbn,
      price: req.body.price,
      publisher: req.body.publisher,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("Books")
      .replaceOne({ _id: bookId }, book);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json("Some error occurred while updating the book.");
    }
  } catch (error) {
    res.status(500).json(error || "An unexpected error occurred.");
  }
};

const deleteBook = async (req, res) => {
  // #swagger.tags = ["Books"]
  // #swagger.summary = "Delete a book by ID"
  try {
    const bookId = new ObjectId(req.params.id);
    if (!bookId) {
      res.status(500).json("Book ID not found.");
    }
    const response = await mongodb
      .getDb()
      .db()
      .collection("Books")
      .deleteOne({ _id: bookId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json("Some error occurred while deleting the book.");
    }
  } catch (error) {
    res.status(500).json(error || "An unexpected error occurred.");
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
