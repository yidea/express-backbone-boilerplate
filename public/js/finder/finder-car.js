/**
 * Finder Car
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/product/views/base/base-view",
  "common/finder/utils/finder-modal-mixin",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/finder-state",
  "common/finder/views/car-wizard-view",
  "common/finder/views/car-year-view",
  "common/finder/views/car-make-view",
  "common/finder/views/car-model-view",
  "common/finder/views/car-submodel-view",
  "common/finder/models/car-make-model",
  "common/finder/models/car-model-model",
  "common/finder/models/car-submodel-model"
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
  CarSubmodelView,
  CarMakeModel,
  CarModelModel,
  CarSubodelModel
  ) {

  var WIZARD = [
    { name: "year", title: "The car year", view: CarYearView },
    { name: "make", title: "The car make", view: CarMakeView, model: CarMakeModel},
    { name: "model", title: "The car model", view: CarModelView, model: CarModelModel },
    { name: "submodel", title: "The car submodel", view: CarSubmodelView, model: CarSubodelModel }
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
