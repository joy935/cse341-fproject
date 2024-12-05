const validator = require("../helpers/validate");

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
        "customerId": "required|string",
        "date": "required|date",
        "total": "required|numeric",
        "bookId": "required|string",
        "status": "required|string"
    }

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: "Validation failed",
                    data: err
                });
        } else {
            next();
        }
    }).catch (err => console.log(err))
};

const saveBook = (req, res, next) => {
    const validationRule = {
        title: "required|string",
        author: "required|string",
        categoryId: "required|string",
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



module.exports = {
  saveUser,
  saveOrder,
  saveBook
};
