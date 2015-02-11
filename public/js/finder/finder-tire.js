/**
 * Finder Tire View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/finder/utils/finder-modal-mixin"
], function (
  $,
  _,
  Backbone,
  FinderModalMixin
) {
  var FinderTireView = Backbone.View.extend(_.extend(FinderModalMixin, {
    el: ".js-modal-tire",

    initialize: function () {
      this.initModal();
    }
  }));

  return FinderTireView;
});
