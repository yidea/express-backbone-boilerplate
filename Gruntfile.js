var path = require("path"),
  _ = require("lodash"),
  glob = require("glob");

module.exports = function(grunt) {
  // require it at the top and pass in the grunt instance
  //require("time-grunt")(grunt);

  // grunt config global
  grunt.config("stylusDir", "public/css/");
  grunt.config("cssDir", "public/css/gen/");

  // util
  var utils = {
    getStylus2cssMap: _.memoize(function () {
      // include in gurnt.initConfig
      grunt.config.requires("stylusDir", "cssDir");
      var cssDir = grunt.config("cssDir"),
        stylusDir = grunt.config("stylusDir"),
        stylus2cssMap = {};

      glob(stylusDir + "*.styl", { sync:true}, function (err, matches) {
        if (err) {
          console.log(err);
          return;
        }
        var stylusFiles = matches;
        if (stylusFiles.length) {
          _.each(stylusFiles, function (stylusPath) {
            var cssPath = cssDir,
              fileName = path.basename(stylusPath, ".styl");
            cssPath += fileName + ".css";
            stylus2cssMap[cssPath] = stylusPath;
          });
        }
      });
      return stylus2cssMap;
    })
  };

  // config task
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"), //<%= pkg.name %>

    stylus: {
      options: {
        banner: "/* Auto generated from stylus <%= grunt.template.today('yyyy-mm-dd') %> */\n",
        compress: false, //compress w cssmin
        use: [
          function () {
            return require("autoprefixer-stylus")({browsers:[
              "last 2 versions",
              "Firefox ESR",
              "ie >= 8"
            ]});
          }
        ]
      },
      compile: {
        //files: utils.getStylus2cssMap()
      }
    },

    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      files: {
        src: [
          "public/**/*.js",
          "!Gruntfile.js",
          "!node_modules/**/*.js",
          "!public/lib/**/*.js",
          "!public/test/**/*.js"
        ]
      }
    },

    jscs: {
      options: {
        config: ".jscsrc"
      },
      src: [
        "public/**/*.js",
        "!Gruntfile.js",
        "!node_modules/**/*.js",
        "!public/lib/**/*.js"
      ]
    },

    watch: {
      gruntfile: {
        files: "Gruntfile.js",
        options: {
          reload: true
        }
      },
      stylus: {
        options: {
          livereload: true,//35728
          spawn: false
        },
        files: [
          "public/css/*.styl"
        ],
        tasks: "newer:stylus"
      },
      hbs: {
        options: {
          livereload: true,
          spawn: false
        },
        files: [
          "views/**/*.hbs"
        ]
      }
    }
  });

  // Load plugin tasks
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-stylus");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks("grunt-newer");

//  grunt.loadNpmTasks("grunt-contrib-uglify");
//  grunt.loadNpmTasks("grunt-browserify");
//  grunt.loadNpmTasks("grunt-jscs");
//  grunt.loadNpmTasks("grunt-githooks");

  //TODO:
//  grunt.loadNpmTasks("grunt-browser-sync");


  // Custom tasks
  grunt.registerTask("dev", ["watch"]); //compile stylus
  grunt.registerTask("check", ["jshint", "jscs"]); //compile stylus
  grunt.registerTask("build", []); // compile stylus, compress w cssmin


};
