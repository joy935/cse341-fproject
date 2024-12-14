const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/orders");
const validation = require("../middleware/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", isAuthenticated, ordersController.getOrders);

router.get("/:id", isAuthenticated, ordersController.getOrder);

router.post(
  "/",
  isAuthenticated,
  validation.saveOrder,
  ordersController.createOrder
);

router.put(
  "/:id",
  isAuthenticated,
  validation.saveOrder,
  ordersController.updateOrder
);

router.delete("/:id", isAuthenticated, ordersController.deleteOrder);

module.exports = router;
