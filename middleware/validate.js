const validator = require("../helpers/validate");
const mongodb = require("../data/database");

const saveUser = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    email: "required|email",
    address: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};


const saveOrder = async (req, res, next) => {
  const validationRule = {
    customerId: "required|string",
    date: "required|date",
    total: "required|numeric",
    bookId: "required|string",
    status: "required|string",
  };

  validator(req.body, validationRule, {}, async (err, status) => {
    if (!status) {
      return res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } 

    const bookId = req.body.bookId;
    const userId = req.body.customerId;

    try {
      // check if the book exists
      const bookExists = await mongodb.getDb().db().collection("Books").findOne({ _id: bookId });
      if (!bookExists) {
        return res.status(404).json({
          success: false,
          message: "Book not found.",
        });
      }

      // check if the customer exists
      const customerExists = await mongodb.getDb().db().collection("Users").findOne({ _id: userId });
      if (!customerExists) {
        return res.status(404).json({
          success: false,
          message: "Customer not found.",
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred during validation.",
        error: error.message,
      });
    }
  });
};

const saveBook = (req, res, next) => {
    const validationRule = {
        title: "required|string",
        author: "required|string",
        categoryCode: "required|string",
        description: "required|string",
        isbn: "required|string",
        price: "required|numeric",
        publisher: "required|string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

const saveCategory = async (req, res, next) => {
  const validationRule = {
      "categoryCode": "required|string",
      "categoryName": "required|string"
  };

  await validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
          res.status(412)
              .send({
                  success: false,
                  message: 'Validation failed',
                  data: err
              });
      } else {
          next();
      }
  }).catch( err => console.log(err))
};

module.exports = {
  saveUser,
  saveOrder,
  saveBook,
  saveCategory
};
