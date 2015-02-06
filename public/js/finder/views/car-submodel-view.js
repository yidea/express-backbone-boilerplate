/**
 * Car Submodel View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/product/views/base/base-view",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/finder-state",
  "hbs!common/finder/templates/car-model"
], function ($, _, Backbone, BaseView, EventBus, AppState, tmpl) {

  return BaseView.extend({
    el: ".js-finder-body-main",

    template: tmpl,

    initialize: function () {
      this.listenTo(AppState, "change:model", this.fetchModel);
      this.listenTo(this.model, "request", this.showSpinner);
      this.listenTo(this.model, "sync", this.render);
    },

    render: function () {
      //TODO: temporary to fake loading effect
      _.delay(function () {
        EventBus.trigger("wizard:hideSpinner");
      }, 300);
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    fetchModel: function () {
      this.model.fetch({
        reset: true,
        data: {
          s1: AppState.get("year"),
          s2: AppState.get("make"),
          s3: AppState.get("model")
        }
      });
    },

    showSpinner: function () {
      EventBus.trigger("wizard:showSpinner");
    }
  });

});
