/*
 * vinyl-tf-babel
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.transform = transform;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _vinylTransformer = require("vinyl-transformer");

var _babelCore = require("babel-core");

var _vinylSourcemapsApply = require("vinyl-sourcemaps-apply");

var _vinylSourcemapsApply2 = _interopRequireDefault(_vinylSourcemapsApply);

var BabelTransformer = (function (_Transformer) {
  _inherits(BabelTransformer, _Transformer);

  function BabelTransformer() {
    _classCallCheck(this, BabelTransformer);

    _get(Object.getPrototypeOf(BabelTransformer.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(BabelTransformer, [{
    key: "transform",
    value: function transform(file) {
      if (file.isStream()) {
        throw new Error("Streaming not supported");
      }
      var options = Object.assign({}, this.options, {
        filename: file.path,
        filenameRelative: file.relative,
        sourceMap: Boolean(file.sourceMap)
      });
      try {
        var _babel = (0, _babelCore.transform)(String(file.contents), options);

        var code = _babel.code;
        var map = _babel.map;
        var metadata = _babel.metadata;

        if (file.sourceMap && map) {
          map.file = replaceExt(map.file, ".js");
          (0, _vinylSourcemapsApply2["default"])(file, map);
        }
        file.contents = new Buffer(code);
        file.path = replaceExt(file.path, ".js");
        file.babel = metadata;
        return file;
      } catch (err) {
        this.emit("error", err);
      }
    }
  }]);

  return BabelTransformer;
})(_vinylTransformer.Transformer);

exports.BabelTransformer = BabelTransformer;

function replaceExt(path, ext) {
  return String(path).replace(/[.]([^.]*)$/, ext);
}

function transform(options) {
  return new BabelTransformer(options);
}