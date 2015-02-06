/**
 * Car Model View
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

    events: {
      "click .variant": "_onClickModel"
    },

    initialize: function () {
      this.listenTo(AppState, "change:make", this.fetchModel);
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
          s2: AppState.get("make")
        }
      });
    },

    showSpinner: function () {
      EventBus.trigger("wizard:showSpinner");
    },

    _onClickModel: function (ev) {
      var $target = $(ev.currentTarget),
        model = $.trim($target.text());
      if (model.length) {
        AppState.set("model", model);
      }
      EventBus.trigger("wizard:nextStep", { "selected": model });
    }
  });

});
