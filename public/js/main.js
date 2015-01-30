require(["jquery", "backbone", "common/finder/finder-car"], function ($, Backbone, FinderCar) {
  // Entry point
  $(function () {
    window.App = {};
    window.App.view = {};

    //Backbone.history.start({
    //  pushState: true,
    //  root: "todo"
    //});

    /* jshint nonew:false */
    new FinderCar();
    /* jshint nonew:true */
  });
});
//"common/finder/utils/finder-eventbus",
