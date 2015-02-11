/**
 * Wizard Collection
 */
define(["backbone", "common/finder/models/wizard-model"], function (Backbone, Model) {
  return Backbone.Collection.extend({
    model: Model
  });
});
