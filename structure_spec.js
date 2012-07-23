(function () {
  var root, expect;

  root = this;
  expect = chai.expect;

  mocha.setup({
    ui: "bdd",
    ignoreLeaks: true
  });

  beforeEach(function () {
    this.sandbox = sinon.sandbox.create({
      injectInto: this,
      properties: ["spy", "stub"]
    });
  });

  afterEach(function () {
    this.sandbox.restore();
  });

  describe("Structure", function () {
    it("exists", function () {
      expect(Structure).not.to.be.undefined;
    });

    describe(".init", function () {
      afterEach(function () {
        root.Structure = root.App;
        delete root.App;
      });

      it("removes Structure from the global scope", function () {
        Structure.init("App");

        expect(root).not.to.have.property("Structure");
      });

      it("moves Structure to the provided namespace", function () {
        Structure.init("App");

        expect(root).to.have.property("App");
      });
    });

    describe(".registerModule", function () {
      afterEach(function () {
        delete root.Foo;
      });

      it("creates new namespaces", function () {
        Structure.registerModule("Foo.Bar.Baz");

        expect(Foo.Bar.Baz).to.be.an("object");
      });

      it("doesn't overwrite existing namespaces", function () {
        root.Foo = {
          stillHere: true
        };

        Structure.registerModule("Foo");

        expect(root.Foo).to.have.property("stillHere");
      });

      it("sets the last namespace's value to the provided module", function () {
        var module = {};

        Structure.registerModule("Foo.Bar.Baz", module);

        expect(root.Foo.Bar.Baz).to.equal(module);
      });

      it("passes the registered module to the provided callback", function () {
        var module, callback;

        module = {};
        callback = this.spy();

        Structure.registerModule("Foo.Bar.Baz", module, callback);

        expect(callback).to.have.been.calledWith(module);
      });
    });
  });

  mocha.run();
})();
