/**
 * Finder State
 */
define(["jquery", "backbone", "jquery.cookie"], function ($, Backbone) {
  var TIRE_FINDER_KEY = "tireFinder",
    TIRE_FINDER_EXPIRE = 30;

  var FinderSate = Backbone.Model.extend({
    initialize: function () {
      this.fetch();
      //this.on("change", this.save, this);
    },

    fetch: function () {
      var finderCookie = $.cookie(TIRE_FINDER_KEY),
        settings;
      try {
        settings = JSON.parse(finderCookie);
      } catch (err) {
        settings = null;
      }
      if (settings) {
        this.set(settings);
      }
    },

    save: function () {
      $.cookie(TIRE_FINDER_KEY, JSON.stringify(this.toJSON()),
        { expires: TIRE_FINDER_EXPIRE });
    },

    destroy: function () {
      $.removeCookie(TIRE_FINDER_KEY);
    }
  });

  return new FinderSate();
});
