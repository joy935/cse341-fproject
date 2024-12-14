const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", isAuthenticated, usersController.getAll);

router.get("/:id", isAuthenticated, usersController.getSingle);

router.post(
  "/",
  isAuthenticated,
  validation.saveUser,
  usersController.createUser
);

router.put(
  "/:id",
  isAuthenticated,
  validation.saveUser,
  usersController.updateUser
);

router.delete("/:id", isAuthenticated, usersController.deleteUser);

module.exports = router;
