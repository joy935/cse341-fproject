const router = require("express").Router();
router.use("/", require("./swagger"));

router.get("/", (req, res) => {
  res.send("BookSmart API");
});

router.use("/users", require("./users"));
router.use("/books", require("./books"));
router.use("/orders", require("./orders"));
router.use("/categories", require("./categories"));

module.exports = router;
