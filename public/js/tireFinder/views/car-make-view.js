/**
 * Car Make View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "tireFinder/views/base-view",
  "tireFinder/utils/finder-eventbus",
  "tireFinder/utils/finder-state",
  "tireFinder/utils/tab-widget",
  "hbs!tireFinder/templates/car-make"
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
      this.$el.html(this.template(this.model.toJSON()));
      this.renderTabWidget(this.$(".js-tab-widget"));
      EventBus.trigger("wizard:hideSpinner");
      return this;
    },

    renderTabWidget: function ($tabWidget) {
      TabWidget.init($tabWidget);
    },

    fetchModel: function () {
      this.model.fetch({ reset: true });
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
