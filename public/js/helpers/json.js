/**
 * JSON RJS plugin.
 *
 * Builds into compiled JS for bundles.
 * Internally uses and requires `text` plugin.
 *
 * Inspiration: https://github.com/millermedeiros/requirejs-plugins/blob/master/src/json.js
 */
define(["text"], function (text) {
  var buildMap = {};

  return {
    /**
     * Load a resource. (Proxy text plugin).
     */
    load: function (name, req, onload, config) {
      var handler = function (data) {
        if (config.isBuild) {
          // In build stage, leave as a string and store.
          buildMap[name] = data;
          onload(data);
        } else {
          // In live stage, need to parse.
          onload(JSON.parse(data));
        }
      };

      // url, callback, errback, headers
      text.get(req.toUrl(name), handler, onload.error, { accept: "application/json" });
    },

    /**
     * Optimizer: Write out JSON string with wrapper.
     */
    write: function (pluginName, moduleName, write) {
      if (moduleName in buildMap) {
        var content = buildMap[moduleName];
        write("define(\"" + pluginName + "!" + moduleName +
        "\", function () { return " + content + ";});\n");
      }
    }
  };
});
