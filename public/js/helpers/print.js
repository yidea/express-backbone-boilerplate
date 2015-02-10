define(["hbs/handlebars"], function (Handlebars) {

  //{{print this}}
  function print(context) {
    return new Handlebars.SafeString("<pre>" + JSON.stringify(context, null, 2) + "</pre>");
  }

  Handlebars.registerHelper("print", print);
});
