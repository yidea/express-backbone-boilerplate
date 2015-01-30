define(["hbs/handlebars"], function (Handlebars) {

  function print(context) {
    return JSON.stringify(context);
  }

  //{{print this}}
  Handlebars.registerHelper("print", print);
});
