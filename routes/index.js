const router = require("express").Router();
router.use("/", require("./swagger"));
const passport = require("passport");

// router.get("/", (req, res) => {
//   res.send("BookSmart API");
// });

router.use("/users", require("./users"));
router.use("/books", require("./books"));
router.use("/orders", require("./orders"));
router.use("/categories", require("./categories"));

router.get("/login", passport.authenticate("github"), () => {});
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
