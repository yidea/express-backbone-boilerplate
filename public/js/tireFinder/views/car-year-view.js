/**
 * Car Year View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/product/views/base/base-view",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/finder-state",
  "common/finder/utils/tab-widget",
  "json!common/finder/utils/car-years.json",
  "hbs!common/finder/templates/car-year"
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
