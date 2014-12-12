var express = require("express");

module.exports = (function () {
  var router = express.Router();
  router.get("/", function (req, res) {
    res.render("index", { title: "test" });
  });

  return router;
})();
