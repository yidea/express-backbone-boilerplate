/**
 * DONOT COPY to Atlas, just a mock for product/base-view.js
 */
define(["backbone", "underscore"], function (Backbone, _) {

  var BaseView = Backbone.View.extend({

    initialize: function (options) {
      this.config = _.extend({}, this.config, (options || {}).config);
    },

    remove: function () {
      // Remove child views
      this._closeSubViews();

      Backbone.View.prototype.remove.call(this);
    },

    _getSubViews: function () {
      // Reference to child views to prevent zombies
      if (_.isUndefined(this._subViews)) {
        this._subViews = {};
      }

      return this._subViews;
    },

    _addSubView: function (view) {
      // Return existing, if found.
      var existing = this._getSubViews()[view.cid];
      if (existing) {
        return existing;
      }

      // Else, add to collection.
      this._getSubViews()[view.cid] = view;

      // Return for chaining.
      return view;
    },

    _replaceSubView: function (oldView, newView) {
      if (oldView && oldView !== null) {
        this._removeSubView(oldView);
      }
      return this._addSubView(newView);
    },

    _removeSubView: function (view) {
      var subViews = this._getSubViews();
      if (subViews[view.cid]) {
        subViews[view.cid].remove();
        delete subViews[view.cid];
      }
    },

    _closeSubViews: function () {
      // Remove child views
      _.each(this._getSubViews(), function (view) {
        this._removeSubView(view);
      }, this);
    },

    _locateSubView: function (Constructor) {
      return _.find(this._getSubViews(), function (subView) {
        return subView instanceof Constructor;
      });
    }
  });

  return BaseView;
});
