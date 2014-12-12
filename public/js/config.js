/*
 * Config
 */
(function () {
  require.config({
    baseUrl: "/",
    waitSeconds: 30, //timeout in 30s for slow network
    shim: {
      jquery: {
        exports: "$"
      },
      underscore: {
        exports: "_"
      },
      backbone: {
        deps: ["underscore","jquery"],
        exports: "Backbone"
      },
      bootstrap: {
        deps: ["jquery"],
        exports: "$"
      },
      Handlebars: {
        exports: "Handlebars"
      }
    },
    paths: {
      views: "js/views",
      collections: "js/collections",
      models: "js/models",
      routers: "js/routers",
      templates: "js/templates",
      spec: "js/spec",

      underscore: "lib/underscore/underscore",
      backbone: "lib/backbone/backbone",
      bootstrap: "lib/bootstrap/dist/js/bootstrap",
      Handlebars: "lib/handlebars/handlebars",
      "handlebars.runtime": "lib/handlebars/handlebars.runtime",
      modernizr: "lib/modernizr/modernizr",
      requirejs: "lib/requirejs/require",
      text: "lib/requirejs-text/text",
      jquery: "lib/jquery/dist/jquery.min",
      "hbs.helper": "js/helper/hbshelper"
    }
  });
}).call(this);
