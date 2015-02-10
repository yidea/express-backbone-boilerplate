/**
 * Tab Widget
 *
 * // js
 * var $tabWidget = $(".js-tab-widget");
 * TabWdiget.init($tabWidget);
 * $tabWidget.trigger("show", [0]);
 * // html
 * <div class="tab-widget js-tab-widget">
 *  <ul class="tab-nav">
 *    <li class="active"><a href="#year-0">2010s</a></li>
 *    <li><a href="#year-1">2000s</a></li>
 *    <li class="disabled"><a href="#year-2">2000s</a></li>
 *  </ul>
 *  <div class="tab-content">
 *    <div class="tab-content-pane active" id="year-0" data-pane-id="0"></div>
 *    <div class="tab-content-pane" id="year-1" data-pane-id="1"></div>
 *    <div class="tab-content-pane" id="year-2" data-pane-id="2"></div>
 *  </div>
 * </div>
 */
define(["jquery", "underscore"], function ($, _) {
  function TabWidget ($element) {
    this.$el = $element;
    this.$nav = this.$el.find("> .tab-nav");
    this.$pane = this.$el.find("> .tab-content > .tab-content-pane");
    this.size = this.$pane.length;
    this.init();
  }

  TabWidget.prototype = {
    constructor: TabWidget,

    init: function () {
      _.bindAll(this, "_onClickNav", "_onCustomEvent");
      this.bindUIevents();
    },

    bindUIevents: function () {
      this.$el.on("click", "> .tab-nav > li", this._onClickNav);
      this.$el.on("show complete disable enable", this._onCustomEvent);
    },

    _onClickNav: function (ev) {
      ev.preventDefault();
      var $targetLi = $(ev.currentTarget),
        $targetPane,
        $prevLi,
        $prevPane;
      if (!$targetLi.hasClass("active") && !$targetLi.hasClass("disabled")) {
        $targetPane = $($targetLi.find("a").attr("href"));
        $prevLi = this.$nav.find(".active:last");
        $prevPane = this.$el.find($prevLi.find("a").attr("href"));
        $prevLi.removeClass("active");
        $prevPane.removeClass("active");
        $targetLi.addClass("active");
        $targetPane.addClass("active");
      }
    },

    _onCustomEvent: function (ev, index) {
      ev.stopPropagation();
      if (_.isUndefined(index) || index > this.size - 1) { return; }

      var $target = this.$nav.find("> li").eq(index);
      switch (ev.type) {
        case "show":
          $target
            .removeClass("disabled")
            .trigger("click");
          break;
        case "disable":
          $target.addClass("disabled");
          break;
        case "enable":
          $target.removeClass("disabled");
          break;
        case "complete":
          $target.addClass("completed");
          break;
      }
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
