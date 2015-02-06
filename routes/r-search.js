var express = require("express"),
  Promise = require("bluebird"),
  request = Promise.promisify(require("request")),
  ModelProduct = require("../models/m-product"),
  router = express.Router();

//tirefinder
router.route("/finder-getnext/tire")
  .get(function (req, res) {
    if ("2015" === req.query.s1) {
      if (!req.query.s2) {
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
                    {"name": "H", values: ["Honda"]}
                  ]
                }
              ]
            }
          }
        );
      } else {
        if (!req.query.s3) {
          //year=2015&make=ford http://dev.walmart.com:3000/search/finder-getnext/tire?s1=2015&s2=honda
          if ("HONDA" === req.query.s2.toUpperCase()) {
            res.json(
              {
                "value": {
                  "name": "Models",
                  "values": [
                    "Accord",
                    "Civic",
                    "Pilot",
                    "CRV",
                    "Club Wagon E250",
                    "Club Wagon E350"
                  ]
                }
              }
            );
          } else {
            res.json(
              {
                "value": {
                  "name": "Models",
                  "values": []
                }
              }
            );
          }
        } else {
          //year=2015&make=Honda&model=crv http://dev.walmart.com:3000/search/finder-getnext/tire?s1=2015&s2=honda&s3=crv
          res.json(
            {
              "value": {
                "name": "Sub Models",
                "values": [
                  "EX",
                  "HX",
                  "LX"
                ]
              }
            }
          );
        }
      }
    } else {
      // 2014 below
      if (!req.query.s2) {
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
      } else {
        res.json(
          {
            "value": {
              "name": "Models",
              "values": []
            }
          }
        );
      }
    }
  });

module.exports = router;
