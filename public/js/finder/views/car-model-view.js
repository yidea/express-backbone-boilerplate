/**
 * Car Model View
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

  var KEY = "model";

  return BaseView.extend({
    template: tmpl,

    events: {
      "click .variant": "_onClickModel"
    },

    initialize: function (options) {
      BaseView.prototype.initialize.call(this, options);

      this.listenTo(AppState, "change:make", this.fetchModel);
      this.listenTo(this.model, "request", this.showSpinner);
      this.listenTo(this.model, "sync", this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.hideSpinner();
      return this;
    },

    fetchModel: function () {
      var options = {
        reset: true,
        data: {
          s1: AppState.get("year"),
          s2: AppState.get("make")
        }
      };
      this.model.fetch(options).then(this.restoreSelection);
    },

    restoreSelection: function () {
      var value = AppState.get(KEY),
        id;
      if (_.isUndefined(value)) { return; }

      id = "#" + KEY + "-" + value;
      this.$(id).prop("checked", true);
    },

    _onClickModel: function (ev) {
      var $target = $(ev.currentTarget),
        model = $.trim($target.text());
      if (model.length) {
        AppState.set(KEY, model);
      }
      EventBus.trigger("wizard:nextStep", { "selected": model, "currentStep": this.step });
    }
  });

});
