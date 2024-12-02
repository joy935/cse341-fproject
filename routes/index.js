const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("BookSmart API");
});

router.use("/orders", require("./orders"));

module.exports = router;
