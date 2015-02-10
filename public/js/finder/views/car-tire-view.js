/**
 * Car Tire View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/product/views/base/finder-base-view",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/finder-state",
  "hbs!common/finder/templates/car-tab-tire"
], function ($, _, Backbone, BaseView, EventBus, AppState, tmpl) {

  return BaseView.extend({
    el: ".js-finder-car-tire",

    events: {
      "click .js-btn-finder-back": "_onClickBack"
    },

    template: tmpl,

    initialize: function () {
      this.listenTo(AppState, "change:submodel", this.fetchModel);
      this.listenTo(this.model, "request", this.showSpinner);
      this.listenTo(this.model, "sync", this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.hideSpinner();
      return this;
    },

    fetchModel: function () {
      this.model.fetch({
        reset: true,
        data: {
          s1: AppState.get("year"),
          s2: AppState.get("make"),
          s3: AppState.get("model"),
          s4: AppState.get("submodel")
        }
      });
    },

    _onClickBack: function () {
      EventBus.trigger("finder:showStep", { step: 0 });
    }
  });

});
