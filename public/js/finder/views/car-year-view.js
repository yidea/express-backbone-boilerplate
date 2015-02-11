/**
 * Car Year View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/product/views/base/finder-base-view",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/finder-state",
  "json!common/finder/utils/car-years.json",
  "hbs!common/finder/templates/car-year"
], function ($, _, Backbone, BaseView, EventBus, AppState, dataCarYear, tmpl) {

  var KEY = "year";

  return BaseView.extend({
    template: tmpl,

    events: {
      "click .variant": "_onClickYear"
    },

    initialize: function (options) {
      BaseView.prototype.initialize.call(this, options);

      this.listenTo(EventBus, "wizardYear:restore", this.restoreSelection);

      this.render();
    },

    render: function () {
      this.$el.html(this.template(dataCarYear));
      this.$tabWidget = this.$(".js-tab-widget");
      this.renderTabWidget(this.$tabWidget);
      return this;
    },

    restoreSelection: function () {
      var value = AppState.get(KEY),
        id;
      if (_.isUndefined(value)) { return; }

      id = "#" + KEY + "-" + value;
      var $target = this.$(id);
      if ($target) {
        $target.prop("checked", true);
        var index = $target.closest(".tab-content-pane").data("pane-id");
        this.$tabWidget.trigger("show", [index]);
      }
    },

    _onClickYear: function (ev) {
      var $target = $(ev.currentTarget),
        year = $target.text();
      if (!_.isUndefined(year)) {
        AppState.set("year", year);
      }
      EventBus.trigger("wizard:nextStep", { "selected": year, "currentStep": this.step });
    }
  });

});
