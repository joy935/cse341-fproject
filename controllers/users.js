const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ["Users"]
  //#swagger.summary = "Get all users"
  try {
    const lists = await mongodb
      .getDb()
      .db()
      .collection("Users")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.summary = "Get an user by ID"

  try {
    // Check if the provided ID is valid
    if (!ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid user id to find a contact." });
    }

    const userId = new ObjectId(req.params.id);

    // Fetch the contact document from the database
    const result = await mongodb
      .getDb()
      .db()
      .collection("Users")
      .findOne({ _id: userId });

    // If the contact isn't found, return a 404 status
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set the response header and send the contact data
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching single contact:", err);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the user." });
  }
};

const createUser = async (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.summary = "Create a new user"

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection("Users")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred whilst creating the user");
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.summary = "Update a user by ID"

  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("Users")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred whilst updating the user");
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  //#swagger.summary = "Delete an user by ID"

  const usersId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("Users")
    .deleteOne({ _id: usersId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred whilst deleting the user");
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
