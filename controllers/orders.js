const mongodb = require("../data/database");

const getOrders = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection("order").find();
        result.toArray().then((orders) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(orders);
        });
    } catch (error) {
        res.status(500).json(error || "Some error occurred while fetching the orders.");
    }
};

module.exports = {
    getOrders
};