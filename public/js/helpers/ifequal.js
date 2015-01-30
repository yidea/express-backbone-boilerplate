define(["hbs/handlebars"], function (Handlebars) {

  //{{#ifequal completed 1}}item{{else}}items{{/ifequal}}
  function ifequal (val1, val2, options) {
    if (val1 === val2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }

  Handlebars.registerHelper("ifequal", ifequal);
});
