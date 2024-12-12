const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getOrders = async (req, res) => {
  // #swagger.tags = ["Orders"]
  // #swagger.summary = "Get all orders"
  try {
    const result = await mongodb.getDb().db().collection("Orders").find();
    result.toArray().then((orders) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(orders);
    });
  } catch (error) {
    res
      .status(500)
      .json(error || "Some error occurred while fetching the orders.");
  }
};

const getOrder = async (req, res) => {
  // #swagger.tags = ["Orders"]
  // #swagger.summary = "Get a specific order"
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid order id to find an order." });
    }
    const orderId = new ObjectId(req.params.id);
    if (!orderId) {
      res.status(500).json("Order ID not found.");
    }
    const result = await mongodb
      .getDb()
      .db()
      .collection("Orders")
      .find({ _id: orderId });
    if (!result) {
      res.status(404).json("Order not found.");
    }
    result.toArray().then((orders) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(orders[0]);
    });
  } catch (error) {
    res
      .status(500)
      .json(error || "Some error occurred while fetching the order.");
  }
};

const createOrder = async (req, res) => {
  // #swagger.tags = ["Orders"]
  // #swagger.summary = "Create a new order"
  try {
    const order = {
      customerId: req.body.customerId,
      date: req.body.date,
      total: req.body.total,
      bookId: req.body.bookId,
      status: req.body.status,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("Orders")
      .insertOne(order);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json("Some error occurred while creating the order.");
    }
  } catch (error) {
    res.status(500).json(error || "An unexpected error occurred.");
  }
};

const updateOrder = async (req, res) => {
  // #swagger.tags = ["Orders"]
  // #swagger.summary = "Update a specific order"
  try {
    const orderId = new ObjectId(req.params.id);
    if (!orderId) {
      res.status(500).json("Order ID not found.");
    }
    const order = {
      customerId: req.body.customerId,
      date: req.body.date,
      total: req.body.total,
      bookId: req.body.bookId,
      status: req.body.status,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("Orders")
      .replaceOne({ _id: orderId }, order);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json("Some error occurred while updating the order.");
    }
  } catch (error) {
    res.status(500).json(error || "An unexpected error occurred.");
  }
};

const deleteOrder = async (req, res) => {
  // #swagger.tags = ["Orders"]
  // #swagger.summary = "Delete a specific order"
  try {
    const orderId = new ObjectId(req.params.id);
    if (!orderId) {
      res.status(500).json("Order ID not found.");
    }
    const response = await mongodb
      .getDb()
      .db()
      .collection("Orders")
      .deleteOne({ _id: orderId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json("Some error occurred while deleting the order.");
    }
  } catch (error) {
    res.status(500).json(error || "An unexpected error occurred.");
  }
};
module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
