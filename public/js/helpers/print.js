define(["hbs/handlebars"], function (Handlebars) {

  function print(context) {
    return new Handlebars.SafeString("<pre>" + JSON.stringify(context, null, 2) + "</pre>");
  }

  //{{print this}}
  Handlebars.registerHelper("print", print);
});
