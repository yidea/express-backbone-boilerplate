/**
 * Finder Controller
 */
define([
  "jquery",
  "common/finder/finder-car",
  "common/finder/finder-tire"
], function ($, FinderCar, FinderTire) {

  return {
    init: function (el) {
      var $finderEntry = $(el);
      if ($finderEntry.length) {
        $finderEntry.on("click", ".js-finder-btn", function () {
          var $this = $(this),
            target = $this.data("target");
          if ($(".js-modal-" + target).length) {
            var finderView = $this.data("finder.view");
            if (!finderView) {
              finderView = (target === "car") ? new FinderCar() : new FinderTire();
              $this.data("finder.view", finderView);
            } else {
              finderView.showModal();
            }
          }
        });
      }
    }
  };
});
