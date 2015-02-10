define(["hbs/handlebars"], function (Handlebars) {

  //{{slugify this.name}}
  //Helper converts a string to a lower-cased, dash-separated slug.
  var slugify = function (target) {
    if (!target) {
      return;
    }

    return target
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  Handlebars.registerHelper("slugify", slugify);
});
