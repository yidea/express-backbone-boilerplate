/**
 * Car Model Model
 */
define(["backbone", "common/finder/utils/finder-state"], function (Backbone, AppState) {

  //http://dev.walmart.com:3000/search/finder-getnext/tire?s1=2015&s2=ford
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
