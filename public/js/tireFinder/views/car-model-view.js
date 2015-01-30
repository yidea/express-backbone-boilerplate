/**
 * Car Model View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "tireFinder/views/base-view",
  "tireFinder/utils/finder-eventbus",
  "tireFinder/utils/finder-state",
  "hbs!tireFinder/templates/car-model"
], function ($, _, Backbone, BaseView, EventBus, AppState, tmpl) {

  return BaseView.extend({
    el: ".js-finder-body-main",

    template: tmpl,

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.append(this.template());

      this.$content = this.$(".js-finder-car-model");
      return this;
    },

    show: function () {
      this.$content.addClass("active");
      return this;
    },

    hide: function () {
      this.$content.removeClass("active");
      return this;
    }
  });

});
