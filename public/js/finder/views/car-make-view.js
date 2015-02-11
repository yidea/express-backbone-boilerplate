/**
 * Car Make View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/product/views/base/finder-base-view",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/finder-state",
  "hbs!common/finder/templates/car-make"
], function ($, _, Backbone, BaseView, EventBus, AppState, tmpl) {

  var KEY = "make";

  return BaseView.extend({
    template: tmpl,

    events: {
      "click .variant": "_onClickMake"
    },

    initialize: function (options) {
      BaseView.prototype.initialize.call(this, options);

      this.listenTo(AppState, "change:year", this.fetchModel);
      this.listenTo(this.model, "request", this.showSpinner);
      this.listenTo(this.model, "sync", this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$tabWidget = this.$(".js-tab-widget");
      this.renderTabWidget(this.$tabWidget);
      this.hideSpinner();
      return this;
    },

    fetchModel: function (callback) {
      var options = {
        reset: true,
        data: {
          s1: AppState.get("year")
        }
      };
      if (_.isFunction(callback)) { options.success = callback; }
      this.model.fetch(options);
    },

    restoreSelection: function () {
      var make = AppState.get(KEY),
        id;
      if (make) {
        id = "#" + KEY + "-" + this.slugify(make);
        _.defer(_.bind(function () {
          var $target = this.$(id);
          if ($target) {
            $target.prop("checked", true);
            var index = $target.closest(".tab-content-pane").data("pane-id");
            this.$tabWidget.trigger("show", [index]);
          }
        }, this));
      }
    },

    _onClickMake: function (ev) {
      var $target = $(ev.currentTarget),
        make = $target.text();
      if (!_.isUndefined(make)) { AppState.set(KEY, make); }
      EventBus.trigger("wizard:nextStep", { "selected": make, "currentStep": this.step });
    }
  });

});