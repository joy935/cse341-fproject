const express = require("express");
const router = express.Router();
const validation = require("../middleware/validate");
const booksController = require("../controllers/books");

router.get("/", booksController.getBooks);
router.get("/:id", booksController.getBook);
router.post("/", validation.saveBook, booksController.createBook);
router.put("/:id", validation.saveBook, booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;