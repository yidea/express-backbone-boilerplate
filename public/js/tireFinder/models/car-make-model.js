/**
 * Car Make Model
 */
define(["backbone", "tireFinder/utils/finder-state"], function (Backbone, AppState) {

  return Backbone.Model.extend({
    urlRoot: "/api/finder?",

    yearParam: "s1",

    url: function () {
      var url = this.urlRoot,
        year = AppState.get("year");
      if (year) {
        url += this.yearParam + "=" + year;
      }
      return url;
    }
  });

});
