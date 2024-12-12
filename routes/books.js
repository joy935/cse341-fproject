const express = require("express");
const router = express.Router();
const validation = require("../middleware/validate");
const booksController = require("../controllers/books");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", booksController.getBooks);
router.get("/:id", booksController.getBook);
router.post(
  "/",
  isAuthenticated,
  validation.saveBook,
  booksController.createBook
);
router.put(
  "/:id",
  isAuthenticated,
  validation.saveBook,
  booksController.updateBook
);
router.delete("/:id", isAuthenticated, booksController.deleteBook);

module.exports = router;
