;(function () {
  var root, slice, bind, bindAll, Structure;

  root = this;

  slice = Array.prototype.slice;

  bind = Function.prototype.bind || function (obj) {
    var target, args, bound;

    target = this;
    args = slice.call(arguments, 1);
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

  bindAll = function (obj) {
    var key;

    for (key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] == "function") {
        obj[key] = bind.call(obj[key], obj);
      }
    }
  };

  Structure = {
    init: function (namespace) {
      if (root.Structure) {
        try {
          delete root.Structure;
        } catch (ex) {
          root.Structure = undefined;
        }

        root[namespace] = this;
      }
    },

    registerModule: function (namespaces, module, callback) {
      var i, l, baseObj;

      baseObj = root;
      namespaces = namespaces.split(/\./);
      l = namespaces.length;

      for (i = 0; i < l; i++) {
        if (!baseObj[namespaces[i]]) {
          if (i === l - 1 && module) {
            baseObj[namespaces[i]] = module;
          } else {
            baseObj[namespaces[i]] = {};
          }
        }

        baseObj = baseObj[namespaces[i]];
      }

      bindAll(module);

      if (callback) {
        callback(module);
      }
    },
  };

  root.Structure = Structure;
}).call(this);
