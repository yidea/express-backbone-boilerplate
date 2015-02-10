/**
 * Car Wizard View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/product/views/base/finder-base-view",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/finder-state",
  "hbs!common/finder/templates/car-tab-wizard"
], function ($, _, Backbone, BaseView, EventBus, AppState, tmpl) {
  return BaseView.extend({
    el: ".js-finder-car-widget",

    template: tmpl,

    initialize: function (options) {
      this.steps = options.steps;
      this.$el.html(this.template({ steps: this.steps }));
      this.$stepContents = this.$(".js-finder-car-content");
      this.$stepNavs = this.$(".js-finder-body-sidebar li");
      this.$spinner = this.$(".js-spinner-backdrop");
      this.stepViews = [];

      // add step subviews
      _.each(this.steps, function (item, index) {
        var StepView = item.view,
          options = {};
        if (StepView) {
          options.el = this.$stepContents.eq(index);
          options.step = index;
          if (item.model) { options.model = new item.model(); }
          this.stepViews[index] = new StepView(options);
          this._addSubView(this.stepViews[index]);
        }
      }, this);

      _.bindAll(this, "_renderStepNav");
      this.listenTo(EventBus, "wizard:restore", this._restore);
      this.listenTo(EventBus, "wizard:nextStep", this._nextStep);
      this.listenTo(EventBus, "wizard:showSpinner", this._showSpinner);
      this.listenTo(EventBus, "wizard:hideSpinner", this._hideSpinner);

      this.$tabWidget = this.$el.find("> .js-tab-widget");
      this.renderTabWidget(this.$tabWidget);
    },

    _restore: function () {
      //restore navs
      this.$stepNavs.each(function () {
        var $this = $(this),
          name = $this.data("name");
        $this
          .removeClass("disabled")
          .attr("data-completed", true);
        if (name) {
          $this.find("a").text(AppState.get(name));
        }
      });

      //restore tab selection
      _.each(this.stepViews, function (item, index) {
        //trigger fetchModel if has, then pass restoreSelection
        if (this.stepViews[index].model) {
          this.stepViews[index].fetchModel(this.stepViews[index].restoreSelection);
        } else {
          this.stepViews[index].restoreSelection();
        }
      }, this);

      //restore steps
      EventBus.trigger("finder:enableStep", { step: 1 });
    },

    _nextStep: function (data) {
      data = data || {};
      data.currentStep = +data.currentStep;
      var nextStep = _.isNaN(data.currentStep) ? 1 : data.currentStep + 1;
      if (nextStep > this.steps.length || nextStep < 0) { return; }

      if (nextStep === this.steps.length) {
        EventBus.trigger("finder:completeStep", { step: 0 });
        EventBus.trigger("finder:showStep", { step: 1 });
      } else {
        this.$tabWidget.trigger("show", [nextStep]);
        this._renderStepNav(nextStep, data.selected);
      }
    },

    _renderStepNav: function (nextStep, selected) {
      var $currentStepNav = this.$stepNavs.eq(nextStep - 1);
      $currentStepNav
        .removeClass("active")
        .attr("data-completed", true);
      if (selected) { $currentStepNav.find("a").text(selected); }

      // reset completed steps
      _.each($currentStepNav.nextAll("li[data-completed]"), function (element) {
        var $el = $(element),
          stepIndex = $el.data("id");
        $el.attr("data-completed", "");
        if (stepIndex !== -1) {
          $el
            .addClass("disabled")
            .find("a")
            .text(this.steps[stepIndex].title);
        }
      }, this);

      // reset step tire
      EventBus.trigger("finder:disableStep", { step: 1 });

      // render nextStepNav
      var $nextStepNav = this.$stepNavs.eq(nextStep);
      $nextStepNav
        .addClass("active")
        .removeClass("disabled")
        .attr("data-completed", false);
    },

    _showSpinner: function () {
      this.$spinner.removeClass("hide-content");
    },

    _hideSpinner: function () {
      this.$spinner.addClass("hide-content");
    }
  });

});
