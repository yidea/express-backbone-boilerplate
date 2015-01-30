var express = require("express"),
  Promise = require("bluebird"),
  request = Promise.promisify(require("request")),
  ModelProduct = require("../models/m-product"),
  router = express.Router();

//tirefinder
router.route("/finder-getnext/tire")
  .get(function (req, res) {
    if (req.query.s1 === "2015") {
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
                    "values": ["Acura", "Alfa Romeo", "Aston Martin", "Audi", "Avanti"]
                  },
                  {
                    "name": "B",
                    "values": ["BMW", "Bentley", "Buick"]
                  },
                  {
                    "name": "C",
                    "values": ["Cadillac", "Chevrolet", "Chrysler"]
                  },
                  {
                    "name": "D",
                    "values": ["DAF"]
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
