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

    fetchModel: function () {
      var options = {
        reset: true,
        data: {
          s1: AppState.get("year"),
          s2: AppState.get("make"),
          s3: AppState.get("model")
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

    _onClickSubModel: function (ev) {
      var $target = $(ev.currentTarget),
        submodel = $.trim($target.text());
      if (submodel.length) {
        AppState.set(KEY, submodel);
        AppState.set("complete", true);
        //TODO: pending on ux decision on when to save the user selection
        //https://jira.walmart.com/browse/SEARCH-7695
        //AppState.save();
      }
      EventBus.trigger("wizard:nextStep", { "selected": submodel, "currentStep": this.step });
    }
  });

});
