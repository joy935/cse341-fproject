const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getOrders = async (req, res) => {
    // #swagger.tags = ['Orders']
    try {
        const result = await mongodb.getDb().db().collection("order").find();
        result.toArray().then((orders) => {
            res.setHeader('Content-Type", "application/json');
            res.status(200).json(orders);
        });
    } catch (error) {
        res.status(500).json(error || 'Some error occurred while fetching the orders.');
    }
};

const getOrder = async (req, res) => {
    // #swagger.tags = ['Orders']
    try {
        const orderId = new ObjectId(req.params.id);
        if (!orderId) {
            res.status(500).json("Book ID not found.");
        }
        const result = await mongodb.getDb().db().collection("order").find({ _id: orderId });
        if (!result) {
            res.status(404).json("Order not found.");
        }
        result.toArray().then((orders) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(orders[0]);
        });
    } catch (error) {
        res.status(500).json(error || "Some error occurred while fetching the order.");
    }
}

const createOrder = async (req, res) => {
    // #swagger.tags = ['Orders']
    try {
        const order = { // adjust the fields as the database
            userId: req.body.userId,
            bookId: req.body.bookId,
            total: req.body.total,
            date: req.body.date,
            status: req.body.status
        };
        const response = await mongodb.getDb().db().collection("order").insertOne(order);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json("Some error occurred while creating the order.");
        }
    } catch (error) {
        res.status(500).json(error || "An unexpected error occurred.");
    }
};

const updateOrder = async (req,res) => {
    // #swagger.tags = ["Orders"]
    try {
        const orderId = new ObjectId(req.params.id);
        if (!orderId) {
            res.status(500).json("Order ID not found.");
        }
        const order = { // adjust the fields as the database
            userId: req.body.userId,
            bookId: req.body.bookId,
            total: req.body.total,
            date: req.body.date,
            status: req.body.status
        };
        const response = await mongodb.getDb().db().collection("order").replaceOne({ _id: orderId }, order);
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
    // #swagger.tags = ['Orders']
    try {
        const orderId = new ObjectId(req.params.id);
        if (!orderId) {
            res.status(500).json("Order ID not found.");
        }
        const response = await mongodb.getDb().db().collection("order").deleteOne({ _id: orderId }, true);
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
    deleteOrder
};