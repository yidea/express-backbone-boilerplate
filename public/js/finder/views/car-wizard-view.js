/**
 * Car Wizard View
 */
define([
  "jquery",
  "underscore",
  "backbone",
  "common/product/views/base/finder-base-view",
  "common/finder/views/car-wizard-sidebar-view",
  "common/finder/utils/finder-eventbus",
  "common/finder/collections/wizard-collection",
  "hbs!common/finder/templates/car-tab-wizard"
], function ($, _, Backbone, BaseView, WizardSidebarView, EventBus, WizardCollection, tmpl) {

  return BaseView.extend({
    el: ".js-finder-car-widget",

    template: tmpl,

    initialize: function (options) {
      options = options || {};
      if (_.isUndefined(options.steps)) { return; }

      this.steps = options.steps;
      this.$el.html(this.template({ steps: this.steps }));
      this.$stepContents = this.$(".js-finder-car-content");
      this.stepViews = [];

      _.bindAll(this, "_renderStepNav");
      this.listenTo(EventBus, "wizard:restore", this._restore);
      this.listenTo(EventBus, "wizard:nextStep", this._nextStep);

      this._addSubView(new WizardSidebarView({ collection: new WizardCollection(this.steps)}));
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

      this.$tabWidget = this.$el.find("> .js-tab-widget");
      this.renderTabWidget(this.$tabWidget);
    },

    _restore: function () {
      // restore sidebar step
      EventBus.trigger("wizardSidebar:restore");

      // restore year
      EventBus.trigger("wizardYear:restore");

      // restore finder steps
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
      // render current & next sidebar step
      EventBus.trigger("wizardSidebar:completeStep", { step: nextStep - 1, value: selected });
      EventBus.trigger("wizardSidebar:startStep", { step: nextStep });

      // reset rest sidebar steps
      EventBus.trigger("wizardSidebar:reset", { nextStep: nextStep });

      // reset tab tire
      EventBus.trigger("finder:disableStep", { step: 1 });
    }
  });

});
