var express = require("express"),
  Promise = require("bluebird"),
  request = Promise.promisify(require("request")),
  ModelProduct = require("../models/m-product"),
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

// RESTful CRUD w mongoose
router.route("/product")
  .get(function (req, res) {
    // get all
    ModelProduct.find(function (err, items) {
      if (err) return res.send(err);
      res.json(items);
    });
  })
  .post(function (req, res) {
    // create one
    //http://localhost:3000/api/product/ w POST data
    //TODO: validation
    var product = new ModelProduct();
    product.title = req.body.title;
    product.save(function (err) {
      if (err) return res.send(err);
      res.json({ msg: "Created successfully"});
    });
  });

router.route("/product/:id")
  .get(function (req, res) {
    // Get one byID
    // http://localhost:3000/api/product/548f5aa5cd74e40000cbfdfb
    ModelProduct.findById(req.params.id, function (err, product) {
      if (err) return res.send(err);
      res.json(product);
    });
  })
  .put(function (req, res) {
    // Put one update
    ModelProduct.findById(req.params.id, function (err, product) {
      if (err) return res.send(err);
      product.title = req.body.title;
    });
  });

module.exports = router;
