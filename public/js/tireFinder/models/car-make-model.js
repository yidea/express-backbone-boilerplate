/**
 * Car Make Model
 */
define(["backbone", "common/finder/utils/finder-state"], function (Backbone, AppState) {

  return Backbone.Model.extend({
    urlRoot: "/search/finder-getnext/tire?",

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
