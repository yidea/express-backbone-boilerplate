/**
 * Requirejs Config
 */
(function () {
  require.config({
    baseUrl: "/",
    waitSeconds: 30, //timeout in 30s for slow network
    hbs: {
      helpers: true,
      i18n: false,
      helperPathCallback: function (name) {
        return "/js/helpers/" + name + ".js";
      }
    },
    shim: {
      jquery: {
        exports: "$"
      },
      "jquery.cookie": {
        deps: ["jquery"],
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
      }
    },
    paths: {
      //project specific
      "common/finder": "js/finder",
      "common/product": "js/finder",

      underscore: "lib/underscore/underscore",
      backbone: "lib/backbone/backbone",
      bootstrap: "lib/bootstrap/dist/js/bootstrap",
      "handlebars.runtime": "lib/handlebars/handlebars.runtime",
      modernizr: "lib/modernizr/modernizr",
      requirejs: "lib/requirejs/require",
      text: "lib/requirejs-text/text",
      hbs: "lib/hbs/hbs",
      json: "js/helpers/json",
      jquery: "lib/jquery/dist/jquery.min",
      "jquery.cookie": "lib/jquery.cookie/jquery.cookie"
    }
  });
}).call(this);
