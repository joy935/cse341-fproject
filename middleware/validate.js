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

const saveCategory = async (req, res, next) => {
  const validationRule = {
      "categoryAcronym": "required|string",
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
  saveCategory
};
