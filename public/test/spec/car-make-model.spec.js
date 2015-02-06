define([
  "jquery",
  "underscore",
  "common/finder/models/car-make-model"
], function ($, _, CarMakeModel) {

  describe("finder/", function () {
    describe("models/", function () {
      describe("car-make-model", function () {
        beforeEach(function () {
          this.model = new CarMakeModel();
        });

        afterEach(function () {
          this.model = null;
        });

        it("should fetch correctly", sinon.test(function () {
          this.server.respondWith("GET", "/search/finder-getnext/tire?s1=2015", [
            200,
            { "Content-Type": "application/json" },
            "{\"value\":{\"name\":\"Models\",\"values\":[]}}"
          ]);
          this.model.fetch({
            data: {
              s1: "2015"
            }
          });
          this.server.respond();

          expect(this.model.get("value").name).to.equal("Models");
        }));

      });
    });
  });

});
