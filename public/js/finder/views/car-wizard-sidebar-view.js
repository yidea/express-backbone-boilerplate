/**
 * Car Wizard Sidebar View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/product/views/base/finder-base-view",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/finder-state",
  "hbs!common/finder/templates/car-tab-wizard-sidebar"
], function ($, _, Backbone, BaseView, EventBus, AppState, tmpl) {

  return BaseView.extend({
    el: ".js-finder-body-sidebar",

    template: tmpl,

    initialize: function () {
      this.listenTo(EventBus, "wizardSidebar:restore", this._restore);
      this.listenTo(EventBus, "wizardSidebar:reset", this._reset);
      this.listenTo(EventBus, "wizardSidebar:completeStep", this._completeStep);
      this.listenTo(EventBus, "wizardSidebar:startStep", this._startStep);
      this.listenTo(this.collection, "change", this.render);

      this.render();
    },

    render: function () {
      this.$el.html(this.template(this.collection.toJSON()));
      this.$stepNavs = this.$("li");
      return this;
    },

    _restore: function () {
      //use clone, so cna restore
      this.collection.each(function (model) {
        var name = model.get("name");
        model.set("title", AppState.get(name));
        model.set("disabled", false);
        model.set("completed", true);
      });
    },

    _reset: function (data) {
      data = data || {};
      if (_.isUndefined(data.nextStep) || !_.isNumber(data.nextStep)) { return; }

      this.$stepNavs.slice(data.nextStep + 1).filter("[data-completed]").each(function () {
        var $this = $(this),
          name = $this.data("name");
        $this
          .addClass("disabled")
          .attr("data-completed", "")
          .find("a")
          .text("The car " + name);
      });
    },

    _completeStep: function (data) {
      data = data || {};
      if (_.isUndefined(data.step) || !_.isNumber(data.step)) { return; }

      this.$stepNavs.eq(data.step)
        .removeClass("active")
        .attr("data-completed", true)
        .find("a")
        .text(data.value);
    },

    _startStep: function (data) {
      data = data || {};
      if (_.isUndefined(data.step) || !_.isNumber(data.step)) { return; }

      this.$stepNavs.eq(data.step)
        .addClass("active")
        .removeClass("disabled")
        .attr("data-completed", false);
    }
  });

});
