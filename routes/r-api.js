var express = require("express"),
  Promise = require("bluebird"),
  request = Promise.promisify(require("request")),
  router = express.Router();

router.get("/", function (req, res) {
  res.json({ msg: "test" });
});

router.get("/ip", function (req, res) {
  request("http://ip.jsontest.com/")
    .then(function (result) {
      var body = result[0].body;
      res.json(JSON.parse(body));
    })
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = router;
