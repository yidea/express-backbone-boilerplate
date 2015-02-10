var express = require("express"),
  Promise = require("bluebird"),
  request = Promise.promisify(require("request")),
  ModelProduct = require("../models/m-product"),
  router = express.Router();

//tirefinder
router.route("/finder-getnext/tire")
  .get(function (req, res) {
    var obj = {};
    if ("1994" === req.query.s1) {
      if (!req.query.s2) {
        //year=1994 http://dev.walmart.com:3000/search/finder-getnext/tire?s1=1994
        obj = {
          "queryInfo": {
            "year": "1994"
          },
          "value": {
            "name": "All Vehicles",
            "values": [
              {
                "name": "A-D",
                "values": [
                  {
                    "name": "A",
                    "values": [
                      "AM General",
                      "Acura",
                      "Alfa Romeo",
                      "Aston Martin",
                      "Audi"
                    ]
                  },
                  {
                    "name": "B",
                    "values": [
                      "BMW",
                      "Bentley",
                      "Buick"
                    ]
                  },
                  {
                    "name": "C",
                    "values": [
                      "Cadillac",
                      "Chevrolet",
                      "Chrysler"
                    ]
                  },
                  {
                    "name": "D",
                    "values": [
                      "Dodge"
                    ]
                  }
                ]
              },
              {
                "name": "E-H",
                "values": [
                  {
                    "name": "E",
                    "values": [
                      "Eagle"
                    ]
                  },
                  {
                    "name": "F",
                    "values": [
                      "Ferrari",
                      "Ford"
                    ]
                  },
                  {
                    "name": "G",
                    "values": [
                      "GMC",
                      "Geo"
                    ]
                  },
                  {
                    "name": "H",
                    "values": [
                      "Honda",
                      "Hyundai"
                    ]
                  }
                ]
              },
              {
                "name": "I-L",
                "values": [
                  {
                    "name": "I",
                    "values": [
                      "Infiniti",
                      "Isuzu"
                    ]
                  },
                  {
                    "name": "J",
                    "values": [
                      "Jaguar",
                      "Jeep"
                    ]
                  },
                  {
                    "name": "K",
                    "values": [
                      "Kia"
                    ]
                  },
                  {
                    "name": "L",
                    "values": [
                      "Lamborghini",
                      "Land Rover",
                      "Lexus",
                      "Lincoln",
                      "Lotus"
                    ]
                  }
                ]
              },
              {
                "name": "M-P",
                "values": [
                  {
                    "name": "M",
                    "values": [
                      "Mazda",
                      "Mercedes-Benz",
                      "Mercury",
                      "Mitsubishi"
                    ]
                  },
                  {
                    "name": "N",
                    "values": [
                      "Nissan"
                    ]
                  },
                  {
                    "name": "O",
                    "values": [
                      "Oldsmobile"
                    ]
                  },
                  {
                    "name": "P",
                    "values": [
                      "Plymouth",
                      "Pontiac",
                      "Porsche"
                    ]
                  }
                ]
              },
              {
                "name": "Q-T",
                "values": [
                  {
                    "name": "Q",
                    "values": []
                  },
                  {
                    "name": "R",
                    "values": [
                      "Rolls Royce"
                    ]
                  },
                  {
                    "name": "S",
                    "values": [
                      "Saab",
                      "Saturn",
                      "Subaru",
                      "Suzuki"
                    ]
                  },
                  {
                    "name": "T",
                    "values": [
                      "Toyota"
                    ]
                  }
                ]
              },
              {
                "name": "U-Z",
                "values": [
                  {
                    "name": "U",
                    "values": []
                  },
                  {
                    "name": "V",
                    "values": [
                      "Volkswagen",
                      "Volvo"
                    ]
                  },
                  {
                    "name": "W",
                    "values": []
                  },
                  {
                    "name": "X",
                    "values": []
                  },
                  {
                    "name": "Y",
                    "values": []
                  },
                  {
                    "name": "Z",
                    "values": []
                  }
                ]
              }
            ]
          }
        };
        res.json(obj);
      } else {
        if (!req.query.s3) {
          //year=1994&make=acura http://dev.walmart.com:3000/search/finder-getnext/tire?s1=1994&s2=acura
          if ("ACURA" === req.query.s2.toUpperCase()) {
            obj = {
              "queryInfo": {
                "year": "1994",
                "make": "Acura"
              },
              "value": {
                "name": "Models",
                "values": [
                  "Integra",
                  "Legend",
                  "NSX",
                  "Vigor"
                ]
              }
            };
            res.json(obj);
          } else {
            res.json({});
          }
        } else {
          if (!req.query.s4) {
            //year=1994&make=acura&model=Integra http://dev.walmart.com:3000/search/finder-getnext/tire?s1=1994&s2=ACURA&s3=integra
            obj = {
              "queryInfo": {
                "year": "1994",
                "make": "Acura",
                "model": "Integra"
              },
              "value": {
                "name": "Sub Models",
                "values": [
                  "GS-R",
                  "LS",
                  "RS"
                ]
              }
            };
            res.json(obj);
          } else {
            //year=1994&make=acura&model=Integra&submodel=RS http://dev.walmart.com:3000/search/finder-getnext/tire?s1=1994&s2=ACURA&s3=integra&submodel=LS
            obj = {
              "queryInfo": {
                "year": "1994",
                "make": "Acura",
                "model": "Integra",
                "submodel": "LS"
              },
              "value": {
                "name": "All Tires",
                "type": "F",
                "values": [
                  {
                    "name": "front",
                    "values": [
                      {
                        "name": "standard",
                        "values": [
                          {
                            "tireSize": "P195/60R14",
                            "sectionWidth": "195",
                            "aspectRatio": "60",
                            "rimDiameter": "14",
                            "speedRating": "H",
                            "loadRatingIndex": "R",
                            "loadRange": "85"
                          }
                        ]
                      },
                      {
                        "name": "optional",
                        "values": [
                          {
                            "tireSize": "P195/60R15",
                            "sectionWidth": "195",
                            "aspectRatio": "60",
                            "rimDiameter": "15",
                            "speedRating": "H",
                            "loadRatingIndex": "R",
                            "loadRange": "85"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            };
            res.json(obj);
          }
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
