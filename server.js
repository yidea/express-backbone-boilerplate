var express = require("express"),
  exphbs = require("express-handlebars"),
  app = express();

// Express config & middleware
var bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  morgan = require("morgan"),
  cookieParser = require("cookie-parser"),
  compression = require("compression"),
  cors = require("cors"),
  hbsHelper = require("./helpers/hbs-helper");

var port = process.env.PORT || 3000,
  env = process.env.NODE_ENV || "development";
app.use(express.static(__dirname + "/public", { maxage: "720h" })); // set Etag, maxage
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(methodOverride());
app.use(cookieParser()); // access req.cookies
app.use(compression()); // gzip response

// Dev/Production
if ("development" === env) {
  app.use(morgan("dev")); // log request to console
} else if ("production" === env) {
  app.enable("view cache"); // aggressive caching for prod
}

// View engine
var hbs = exphbs.create({
  extname: ".handlebars",
  defaultLayout: "main.handlebars",
  helpers: hbsHelper,
  partialsDir: ["views/partials"]
});
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);

// Express routes
var routerApp = require("./routes/r-app"),
  routerApi = require("./routes/r-api");
app.use("/", routerApp); // webapp
app.use("/api", cors(), routerApi); // api

// 404 custom error handler
app.use(function (req, res) { //handle all unhandled requests, put at bottom
  res.status(404).render("404", {title: "404 Sorry, page not found"});
});

// Start server
app.listen(port);
if ("development" === env) {
  console.log("Server running on port " + port);
}
module.exports = app;
