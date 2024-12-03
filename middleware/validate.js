const validator = require("../helper/validate");
const saveOrder = async (req, res, next) => {
    const validationRule = {
        "userId": "required|string",
        "bookId": "required|string",
        "total": "required|numeric",
        "date": "required|date",
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