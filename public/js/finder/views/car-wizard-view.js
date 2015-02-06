/**
 * Car Wizard View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/product/views/base/base-view",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/finder-state",
  "hbs!common/finder/templates/car-wizard"
], function ($, _, Backbone, BaseView, EventBus, AppState, tmpl) {

  return BaseView.extend({
    el: ".js-finder-body",

    events: {
      "click .js-finder-body-sidebar li": "_onClickStepNav"
    },

    template: tmpl,

    initialize: function (options) {
      this.steps = options.steps;
      this.currentStep = 0;

      this.$el.html(this.template({ steps: this.steps }));
      this.$stepContents = this.$(".js-finder-car-content");
      this.$stepNavs = this.$(".js-finder-body-sidebar li");
      this.$spinner = this.$(".js-spinner-backdrop");

      this.stepViews = [];
      _.each(this.steps, function (item, index) {
        var StepView = item.view,
          options = {};
        if (StepView) {
          options.el = this.$stepContents.eq(index);
          if (item.model) {
            options.model = new item.model();
          }
          this.stepViews[index] = new StepView(options);
          this._addSubView(this.stepViews[index]);
        }
      }, this);

      _.bindAll(this, "renderStepNav");
      this.listenTo(EventBus, "wizard:nextStep", this.nextStep);
      this.listenTo(EventBus, "wizard:showStep", this.showStep);
      this.listenTo(EventBus, "wizard:showSpinner", this.showSpinner);
      this.listenTo(EventBus, "wizard:hideSpinner", this.hideSpinner);

      //show step 0
      this.$stepContents.eq(this.currentStep).addClass("active");
      this.$stepNavs.eq(this.currentStep).addClass("active");
    },

    nextStep: function (data) {
      data = data || {};
      var nextStep = this.currentStep + 1;
      if (nextStep > this.steps.length - 1) { return; }
      this.$stepContents.eq(this.currentStep).removeClass("active");
      this.$stepContents.eq(nextStep).addClass("active");
      this.renderStepNav(nextStep, data.selected);
    },

    renderStepNav: function (nextStep, selected) {
      var $currentStepNav = this.$stepNavs.eq(this.currentStep);
      $currentStepNav
        .removeClass("active")
        .attr("data-completed", true);
      if (selected) {
        $currentStepNav.find("a").text(selected);
      }

      // reset rest completed steps
      _.each($currentStepNav.nextAll("li[data-completed]"), function (element) {
        var $el = $(element),
          stepIndex = $el.data("id");
        $el.attr("data-completed", "");
        if (stepIndex !== -1) {
          $el.find("a")
            .addClass("disabled")
            .text(this.steps[stepIndex].title);
        }
      }, this);

      // render nextStepNav
      var $nextStepNav = this.$stepNavs.eq(nextStep);
      $nextStepNav
        .addClass("active")
        .attr("data-completed", false)
        .find("a").removeClass("disabled");

      this.currentStep += 1;
    },

    showStep: function (targetIndex) {
      var $targetNav = this.$stepNavs.eq(targetIndex),
        $targetA = $targetNav.find("a");
      if ($targetA.hasClass("active") || $targetA.hasClass("disabled")) { return; }

      var $preNav = this.$stepNavs.filter(".active:last");
      $preNav.removeClass("active");
      this.$($preNav.find("a").attr("href")).removeClass("active");
      $targetNav.addClass("active");
      this.$($targetA.attr("href")).addClass("active");

      this.currentStep = targetIndex;
    },

    showSpinner: function () {
      this.$spinner.removeClass("hide-content");
    },

    hideSpinner: function () {
      this.$spinner.addClass("hide-content");
    },

    _onClickStepNav: function (ev) {
      ev.preventDefault();
      var $target = $(ev.currentTarget);
      if ($target.find("a").hasClass("disabled")) { return; }

      var targetIndex = $target.data("id");
      this.showStep(targetIndex);
    }
  });

});
