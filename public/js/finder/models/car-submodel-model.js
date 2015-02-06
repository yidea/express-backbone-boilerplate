/**
 * Car Model Model
 */
define(["backbone", "common/finder/utils/finder-state"], function (Backbone, AppState) {

  //TODO: abstract as FinderModal
  //http://dev.walmart.com:3000/search/finder-getnext/tire?s1=2015&s2=ford
  return Backbone.Model.extend({
    urlRoot: "/search/finder-getnext/tire",

    yearParam: "s1",

    makeParam: "s2",

    modelParam: "s3",

    //url: function () {
    //  var url = this.urlRoot,
    //    year = AppState.get("year"),
    //    make = AppState.get("make"),
    //    model = AppState.get("model");
    //  if (year && make && model) {
    //    url += this.yearParam + "=" + year + "&";
    //    url += this.makeParam + "=" + make + "&";
    //    url += this.modelParam + "=" + model;
    //  }
    //  return url;
    //}
  });

});
