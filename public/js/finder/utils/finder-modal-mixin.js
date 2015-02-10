/**
 * Finder Modal Mixin
 */
define([
  "jquery",
  "underscore",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/tab-widget"
], function ($, _, EventBus, TabWidget) {

  return {
    initModal: function () {
      this.$el.on("click", ".js-modal-close", _.bind(this.hideModal, this));
      this.centerModal();
      this.showModal();
    },

    centerModal: function () {
      var marginTop = -1 * (this.$el.height() / 2),
        marginLeft = -1 * (this.$el.width() / 2);
      this.$el.css({
        top: "50%",
        left: "50%",
        "margin-left": marginLeft,
        "margin-top": marginTop,
        "position": "fixed"
      });
    },

    showModal: function () {
      this.$el.addClass("active");
      this.$el.parent().find(".js-modal-backdrop").addClass("active");
    },

    hideModal: function () {
      this.$el.removeClass("active");
      this.$el.parent().find(".js-modal-backdrop").removeClass("active");
    },

    renderTabWidget: function ($tabWidget) {
      TabWidget.init($tabWidget);
    },

    showSpinner: function () {
      EventBus.trigger("wizard:showSpinner");
    },

    hideSpinner: function () {
      _.delay(function () {
        EventBus.trigger("wizard:hideSpinner");
      }, 250);
    },

    slugify: function (str) {
      if (!str) { return; }
      return str
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }
  };

});
