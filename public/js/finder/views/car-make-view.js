/**
 * Car Make View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/product/views/base/base-view",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/finder-state",
  "common/finder/utils/tab-widget",
  "hbs!common/finder/templates/car-make"
], function ($, _, Backbone, BaseView, EventBus, AppState, TabWidget, tmpl) {

  return BaseView.extend({
    template: tmpl,

    events: {
      "click .variant": "_onClickMake"
    },

    initialize: function () {
      _.bindAll(this, "renderTabWidget");
      this.listenTo(AppState, "change:year", this.fetchModel);
      this.listenTo(this.model, "request", this.showSpinner);
      this.listenTo(this.model, "sync", this.render);
    },

    render: function () {
      //TODO: temporary to fake loading effect
      _.delay(function () {
        EventBus.trigger("wizard:hideSpinner");
      }, 300);
      this.$el.html(this.template(this.model.toJSON()));
      this.renderTabWidget(this.$(".js-tab-widget"));
      return this;
    },

    renderTabWidget: function ($tabWidget) {
      TabWidget.init($tabWidget);
    },

    fetchModel: function () {
      this.model.fetch({
        reset: true,
        data: {
          s1: AppState.get("year")
        }
      });
    },

    showSpinner: function () {
      EventBus.trigger("wizard:showSpinner");
    },

    _onClickMake: function (ev) {
      var $target = $(ev.currentTarget),
        make = $target.text();
      if (!_.isUndefined(make)) {
        AppState.set("make", make);
      }
      EventBus.trigger("wizard:nextStep", { "selected": make });
    }
  });

});
