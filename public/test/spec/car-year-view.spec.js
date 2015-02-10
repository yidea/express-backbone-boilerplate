define([
  "jquery",
  "common/finder/utils/finder-eventbus",
  "common/finder/utils/finder-state",
  "common/finder/views/car-year-view"
], function ($, EventBus, AppState, CarYearView) {

  describe("finder/", function () {
    describe("views/", function () {
      describe("car-year-view", function () {
        beforeEach(function () {
          this.$fixture = $("<div class=\"js-finder-car-year js-finder-car-content\">")
            .appendTo($("#fixtures"));
          this.spyRenderTabWidget = sinon.spy(CarYearView.prototype, "renderTabWidget");
          this.spyEventBus = sinon.spy(EventBus, "trigger");
          this.view = new CarYearView({ el: ".js-finder-car-year" });
          this.view.$el.appendTo(this.$fixture);
        });

        afterEach(function () {
          this.$fixture.remove();
          this.spyRenderTabWidget.restore();
          this.spyEventBus.restore();
          this.view.remove();
        });

        it("should init BB view and UI correctly", function () {
          expect(this.view)
            .to.be.ok.and
            .to.be.an.instanceof(CarYearView);
          expect(this.spyRenderTabWidget).to.be.calledOnce;
          expect(this.view.$el.find(".js-tab-widget")).to.be.exist;
        });

        it("should goto next step when click year", function () {
          this.view.$el.find(".tab-content-pane").eq(0).find(".variant").eq(0).trigger("click");

          expect(AppState.get("year")).to.equal("2015");
          expect(this.spyEventBus.getCall(0).args[0]).to.equal("wizard:nextStep");
          expect(this.spyEventBus.getCall(0).args[1]).to.eql({ selected: "2015" });
        });

      });
    });
  });

});
