/**
 * Finder Modal Mixin
 */
define([
  "jquery",
  "underscore"
], function ($, _) {

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
    }
  };

});
