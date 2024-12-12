const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");
const validate = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

// Route to get all and single categories from the database
router.get("/", categoriesController.getAllCategories);
router.get("/:id", categoriesController.getSingleCategory);

// Route to API to perform POST, PUT(update), and DELETE requests
router.post(
  "/",
  isAuthenticated,
  validate.saveCategory,
  categoriesController.createCategory
);
router.put(
  "/:id",
  isAuthenticated,
  validate.saveCategory,
  categoriesController.updateCategory
);
router.delete("/:id", isAuthenticated, categoriesController.deleteCategory);

module.exports = router;
