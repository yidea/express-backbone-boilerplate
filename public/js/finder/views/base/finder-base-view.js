/**
 * Finder Base View
 */
define([
  "jquery",
  "backbone",
  "underscore",
  "common/product/views/base/base-view",
  "common/finder/utils/finder-modal-mixin"
], function ($, Backbone, _, BaseView, FinderModalMixin) {

  return BaseView.extend(_.extend(FinderModalMixin, {
    initialize: function (options) {
      options = options || {};
      if (options.step) { this.step = options.step; }
      _.bindAll(this, "restoreSelection");
    },

    restoreSelection: function () {
      return this;
    }
  }));

});
