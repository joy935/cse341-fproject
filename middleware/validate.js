const validator = require("../helper/validate");
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

module.exports = saveOrder;