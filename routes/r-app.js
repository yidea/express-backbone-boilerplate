var express = require("express"),
  router = express.Router();

router.get("/", function (req, res) {
  res.render("index", { title: "" });
});

router.get("/blog/:title", function (req, res) {
  //console.log(req.param("title"));
});

module.exports = router;

