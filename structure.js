(function () {
  var root, _bind, Structure;

  root = this;

  _bind = Function.prototype.bind || function (obj) {
    var slice, target, args, bound;

    slice = Array.prototype.slice;
    target = this;
    args = Array.prototype.slice.call(arguments, 1);
    bound = function () {
      var F, self;

      if (this instanceof bound) {
        F = function () {};
        F.prototype = target.prototype;
        self = new F;

        result = target.apply(self, args.concat(slice.call(arguments)));

        if (Object(result) === result) {
          return result;
        }

        return self;
      } else {
        return target.apply(obj, args.concat(slice.call(arguments)));
      }
    };

    return bound;
  };

  Structure = {
    init: function (namespace) {
      if (root.Structure) {
        delete root.Structure;
        root[namespace] = this;
      }
    },

    bind: function (obj) {
      var key;

      for (key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] == "function") {
          obj[key] = _bind.call(obj[key], obj);
        }
      }
    }
  };

  root.Structure = Structure;
}).call(this);
