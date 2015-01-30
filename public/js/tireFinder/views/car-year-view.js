/**
 * Car Year View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "tireFinder/views/base-view",
  "tireFinder/utils/finder-eventbus",
  "tireFinder/utils/finder-state",
  "tireFinder/utils/tab-widget",
  "json!tireFinder/utils/car-years.json",
  "hbs!tireFinder/templates/car-year"
], function (
  $,
  _,
  Backbone,
  BaseView,
  EventBus,
  AppState,
  TabWidget,
  dataCarYear,
  tmpl
  ) {

  return BaseView.extend({
    template: tmpl,

    events: {
      "click .variant": "_onClickYear"
    },

    initialize: function () {
      _.bindAll(this, "renderTabWidget");
      this.render();
    },

    render: function () {
      this.$el.html(this.template(dataCarYear));
      this.renderTabWidget(this.$(".js-tab-widget"));
      return this;
    },

    renderTabWidget: function ($tabWidget) {
      TabWidget.init($tabWidget);
    },

    _onClickYear: function (ev) {
      var $target = $(ev.currentTarget),
        year = $target.text();
      if (!_.isUndefined(year)) {
        AppState.set("year", year);
      }
      EventBus.trigger("wizard:nextStep", { "selected": year });
    }
  });

});
