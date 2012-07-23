(function () {
  var expect = chai.expect;

  mocha.setup({
    ui: "bdd",
    ignoreLeaks: true
  });

  describe("Structure", function () {
    it("exists", function () {
      expect(Structure).not.to.be.undefined;
    });

    describe(".init", function () {
      afterEach(function () {
        window.Structure = window.App;
        delete window.App;
      });

      it("removes Structure from the global scope", function () {
        Structure.init("App");

        expect(window).not.to.have.property("Structure");
      });

      it("moves Structure to the provided namespace", function () {
        Structure.init("App");

        expect(window).to.have.property("App");
      });
    });

    describe(".bind", function () {
      var obj;

      beforeEach(function () {
        obj = {
          foo: function () {
            return "foo";
          },

          bar: "baz"
        };
      });

      it("wraps functions in a function setting the correct context", function () {
        var originalFoo = obj.foo;

        Structure.bind(obj);

        expect(obj.foo).not.to.equal(originalFoo);
      });

      it("returns the original value when the wrapped function is called", function () {
        Structure.bind(obj);

        expect(obj.foo()).to.equal("foo");
      });

      it("does not affect non-function properties", function () {
        var originalBar = obj.bar;

        Structure.bind(obj);

        expect(obj.bar).to.equal(originalBar);
      });
    });
  });

  mocha.run();
})();
