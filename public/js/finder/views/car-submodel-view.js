/**
 * Car Submodel View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/product/views/base/finder-base-view",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/finder-state",
  "hbs!common/finder/templates/car-model"
], function ($, _, Backbone, BaseView, EventBus, AppState, tmpl) {

  var KEY = "submodel";

  return BaseView.extend({
    template: tmpl,

    events: {
      "click .variant": "_onClickSubModel"
    },

    initialize: function (options) {
      BaseView.prototype.initialize.call(this, options);

      _.bindAll(this, "restoreSelection");
      this.listenTo(AppState, "change:model", this.fetchModel);
      this.listenTo(this.model, "request", this.showSpinner);
      this.listenTo(this.model, "sync", this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.hideSpinner();
      return this;
    },

    fetchModel: function (callback) {
      var options = {
        reset: true,
        data: {
          s1: AppState.get("year"),
          s2: AppState.get("make"),
          s3: AppState.get("model")
        }
      };
      if (_.isFunction(callback)) { options.success = callback; }
      this.model.fetch(options);
    },

    restoreSelection: function () {
      var submodel = AppState.get(KEY),
        id;
      if (submodel) {
        id = "#" + KEY + "-" + submodel;
        _.defer(_.bind(function () {
          this.$(id).prop("checked", true);
        }, this));
      }
    },

    _onClickSubModel: function (ev) {
      var $target = $(ev.currentTarget),
        submodel = $.trim($target.text());
      if (submodel.length) {
        AppState.set(KEY, submodel);
        AppState.set("complete", true);
        AppState.save();
      }
      EventBus.trigger("wizard:nextStep", { "selected": submodel, "currentStep": this.step });
    }
  });

});
