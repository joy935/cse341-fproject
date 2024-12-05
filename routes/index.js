const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("BookSmart API");
});

router.use("/orders", require("./orders"));
router.use("/users", require("./users"));
router.use("/categories", require("./categories"));

module.exports = router;
