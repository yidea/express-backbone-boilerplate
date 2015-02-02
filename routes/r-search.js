var express = require("express"),
  Promise = require("bluebird"),
  request = Promise.promisify(require("request")),
  ModelProduct = require("../models/m-product"),
  router = express.Router();

//tirefinder
router.route("/finder-getnext/tire")
  .get(function (req, res) {
    if (req.query.s1 === "2015") {
      //year=2015&make=ford http://dev.walmart.com:3000/search/finder-getnext/tire?s1=2015&s2=ford
      if (req.query.s2 && req.query.s2.toUpperCase() === "FORD") {
        res.json(
          {
            "value": {
              "name": "Models",
              "values": [
                "Accord",
                "Civic",
                "Pilot"
              ]
            }
          }
        );
      } else {
        //year=2015 http://dev.walmart.com:3000/search/finder-getnext/tire?s1=2015
        res.json(
          {
            "value": {
              "name": "All 2015 vehicles",
              "type": "all makes",
              "values": [
                {
                  "name": "A-D",
                  "type": "group",
                  "values": [
                    {"name": "A", values: ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Avanti"]},
                    {"name": "B", values: ["BMW", "Bentley", "Buick"]},
                    {"name": "C", values: ["Cadillac", "Chevrolet", "Chrysler"]},
                    {"name": "D", values: ["DAF"]}
                  ]
                },
                {
                  "name": "E-H",
                  "type": "group",
                  "values": [
                    {"name": "E", values: []},
                    {"name": "F", values: ["Ford"]},
                    {"name": "G", values: []},
                    {"name": "H", values: []}
                  ]
                }
              ]
            }
          }
        );
      }
    } else {
      // 2014 below
      res.json(
        {
          "input": {
            "s1": "2005"
          },
          "value": {
            "name": "All 2015 vehicles",
            "type": "all makes",
            "values": [
              {
                "name": "A-D",
                "type": "group",
                "values": [
                  {
                    "name": "A",
                    "values": []
                  },
                  {
                    "name": "B",
                    "values": ["BMW", "Buick"]
                  },
                  {
                    "name": "C",
                    "values": ["Cadillac", "Chevrolet", "Chrysler"]
                  },
                  {
                    "name": "D",
                    "values": []
                  }
                ]
              },
              {
                "name": "E-H",
                "type": "group",
                "values": [
                  {
                    "name": "E",
                    "values": []
                  },
                  {
                    "name": "F",
                    "values": ["Ford"]
                  },
                  {
                    "name": "G",
                    "values": []
                  },
                  {
                    "name": "H",
                    "values": []
                  }
                ]
              }
            ]
          }
        }
      );
    }
  });

module.exports = router;
