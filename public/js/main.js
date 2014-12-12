require(["jquery", "backbone"], function ($, Backbone) {
  // Entry point
  $(function () {
    window.App = {};
    window.App.view = {};

    Backbone.history.start({
      pushState: true,
      root: "todo"
    });

    console.log("index");
  });
});

