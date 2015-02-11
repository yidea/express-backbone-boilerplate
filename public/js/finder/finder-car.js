/**
 * Finder Car
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/product/views/base/finder-base-view",
  "common/finder/utils/finder-modal-mixin",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/finder-state",
  "common/finder/views/car-wizard-view",
  "common/finder/views/car-tire-view",
  "common/finder/views/car-year-view",
  "common/finder/views/car-make-view",
  "common/finder/views/car-model-view",
  "common/finder/views/car-submodel-view",
  "common/finder/models/finder-car-model"
], function (
  $,
  _,
  Backbone,
  BaseView,
  FinderModalMixin,
  EventBus,
  AppState,
  CarWizardView,
  CarTireView,
  CarYearView,
  CarMakeView,
  CarModelView,
  CarSubmodelView,
  CarModel
  ) {
  var WIZARD = [
    { name: "year", disabled: false, view: CarYearView },
    { name: "make", disabled: true, view: CarMakeView, model: CarModel },
    { name: "model", disabled: true, view: CarModelView, model: CarModel },
    { name: "submodel", disabled: true, view: CarSubmodelView, model: CarModel }
  ];

  return BaseView.extend({
    el: ".js-modal-car",

    initialize: function () {
      this.initModal();

      this.listenTo(EventBus, "finder:showStep", this._showStep);
      this.listenTo(EventBus, "finder:completeStep", this._completeStep);
      this.listenTo(EventBus, "finder:disableStep", this._disableStep);
      this.listenTo(EventBus, "finder:enableStep", this._enableStep);

      this._addSubView(new CarWizardView({ steps: WIZARD }));
      this._addSubView(new CarTireView({ model: new CarModel() }));

      this.$steps = this.$el.find(".js-tab-widget").first();
      this.renderTabWidget(this.$steps);

      //restore if year,make,model,submodel data exist
      AppState.fetch();
      if (AppState.get("complete") === true) {
        EventBus.trigger("wizard:restore");
      }
    },

    _showStep: function (data) {
      data = data || {};
      if (!_.isUndefined(data.step) && _.isNumber(data.step)) {
        this.$steps.trigger("show", [data.step]);
      }
    },

    _completeStep: function (data) {
      data = data || {};
      if (!_.isUndefined(data.step) && _.isNumber(data.step)) {
        this.$steps.trigger("complete", [data.step]);
      }
    },

    _disableStep: function (data) {
      data = data || {};
      if (!_.isUndefined(data.step) && _.isNumber(data.step)) {
        this.$steps.trigger("disable", [data.step]);
      }
    },

    _enableStep: function (data) {
      data = data || {};
      if (!_.isUndefined(data.step) && _.isNumber(data.step)) {
        this.$steps.trigger("enable", [data.step]);
      }
    }
  });

});
