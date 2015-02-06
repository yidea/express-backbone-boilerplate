/**
 * Tab Widget
 *
 * - TabWdiget.init("js-tab-widget")
 */
define(["jquery", "underscore"], function ($, _) {
  function TabWidget ($element) {
    this.$el = $element;
    this.$nav = this.$el.find("> .tab-nav");
    this.$pane = this.$el.find("> .tab-nav > .tab-content-pane");
    this.size = this.$pane.length;
    this.init();
  }

  TabWidget.prototype = {
    constructor: TabWidget,

    init: function () {
      _.bindAll(this, "_onClickNav", "_onShow");
      this.bindUIevents();
    },

    bindUIevents: function () {
      this.$el.on("click", "> .tab-nav > li", this._onClickNav);
    },

    _onClickNav: function (ev) {
      ev.preventDefault();
      var $targetLi = $(ev.currentTarget),
        $targetPane,
        $prevLi,
        $prevPane;
      if (!$targetLi.hasClass("active")) {
        $targetPane = $($targetLi.find("a").attr("href"));
        $prevLi = this.$nav.find(".active:last");
        $prevPane = this.$el.find($prevLi.find("a").attr("href"));
        $prevLi.removeClass("active");
        $prevPane.removeClass("active");
        $targetLi.addClass("active");
        $targetPane.addClass("active");
      }
    },

    _onShow: function (ev, index) {
      if (_.isUndefined(index) || index > this.size) { return; }
      this.$nav.find("> li").eq(index).trigger("click");
    }
  };

  return {
    init: function (element) {
      var $el = $(element);
      $el.each(function () {
        var $this = $(this),
          tabwidget = $this.data("tabwidget");
        if (!tabwidget) {
          tabwidget = new TabWidget($this);
          $this.data("tabwidget", tabwidget);
        }
      });
    }
  };

});
