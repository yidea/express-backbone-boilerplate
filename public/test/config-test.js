/**
 * Requirejs Config for Test
 */
(function () {
  var root = "/public";
  require.config({
    baseUrl: "/",
    waitSeconds: 30, //timeout in 30s for slow network
    hbs: {
      helpers: true,
      i18n: false,
      helperPathCallback: function (name) {
        return root + "/js/helpers/" + name + ".js";
      }
    },
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
      }
    },
    paths: {
      //project specific
      "common/finder": root + "/js/finder",
      "common/product": root + "/js/finder",

      underscore: root + "/lib/underscore/underscore",
      backbone: root + "/lib/backbone/backbone",
      jquery: root + "/lib/jquery/dist/jquery.min",
      "jquery.cookie": root + "/lib/jquery.cookie/jquery.cookie",
      requirejs: root + "/lib/requirejs/require",
      hbs: root + "/lib/hbs/hbs",
      text: root + "/lib/requirejs-text/text",
      json: root + "/js/helpers/json"
    }
  });
})();
