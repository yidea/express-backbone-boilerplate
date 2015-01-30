/**
 * Finder Car
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "tireFinder/views/base-view",
  "tireFinder/utils/finder-modal-mixin",
  "tireFinder/utils/finder-eventbus",
  "tireFinder/utils/finder-state",
  "tireFinder/views/car-wizard-view",
  "tireFinder/views/car-year-view",
  "tireFinder/views/car-make-view",
  "tireFinder/views/car-model-view",
  "tireFinder/models/car-make-model"
], function (
  $,
  _,
  Backbone,
  BaseView,
  FinderModalMixin,
  EventBus,
  AppState,
  CarWizardView,
  CarYearView,
  CarMakeView,
  CarModelView,
  CarMakeModel
  ) {

  var WIZARD = [
    { name: "year", title: "The car year", view: CarYearView },
    { name: "make", title: "The car make", view: CarMakeView, model: CarMakeModel},
    { name: "model", title: "The car model", view: CarModelView },
    { name: "submodel", title: "The car submodel", view: null }
  ];

  return BaseView.extend(_.extend(FinderModalMixin, {
    el: ".js-modal-car",

    initialize: function () {
      this.initModal();

      AppState.set("inProcess", true);

      //add subviews
      this._addSubView(new CarWizardView({ steps: WIZARD }));
    },

    _onBeforeUnload: function () {
      $(this._getWindow()).on("beforeunload", function () {
        if (AppState.get("inProcess")) {
          return "You are setting up the Tire Finder";
        }
      });
    },

    _getWindow: function () {
      return window;
    }
  }));

});