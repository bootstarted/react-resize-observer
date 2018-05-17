"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var style = {
  position: 'absolute',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  zIndex: -1,
  visibility: 'hidden',
  pointerEvents: 'none'
};
var styleChild = {
  position: 'absolute',
  left: 0,
  top: 0,
  transition: '0s'
};

function isAncestor(node, ancestor) {
  var current = node.parentNode;

  while (current) {
    if (current === ancestor) {
      return true;
    }

    current = current.parentNode;
  }

  return false;
}

var ResizeObserver =
/*#__PURE__*/
function (_React$Component) {
  _createClass(ResizeObserver, null, [{
    key: "_handleScroll",
    value: function _handleScroll(event) {
      var length = ResizeObserver._scrollListeners.length;

      for (var i = 0; i < length; i++) {
        ResizeObserver._scrollListeners[i].call(undefined, event);
      }
    }
  }, {
    key: "_handleResize",
    value: function _handleResize(event) {
      var length = ResizeObserver._resizeListeners.length;

      for (var i = 0; i < length; i++) {
        ResizeObserver._resizeListeners[i].call(undefined, event);
      }
    }
  }, {
    key: "addScrollListener",
    value: function addScrollListener(listener) {
      if (ResizeObserver._scrollListeners.length === 0) {
        document.addEventListener('scroll', ResizeObserver._handleScroll, true);
      }

      var subscribed = true;

      ResizeObserver._scrollListeners.push(listener);

      return function removeScrollListener() {
        if (!subscribed) return;
        subscribed = false;

        ResizeObserver._scrollListeners.splice(ResizeObserver._scrollListeners.indexOf(listener), 1);

        if (ResizeObserver._scrollListeners.length === 0) {
          document.removeEventListener('scroll', ResizeObserver._handleScroll, true);
        }
      };
    }
  }, {
    key: "addResizeListener",
    value: function addResizeListener(listener) {
      if (ResizeObserver._resizeListeners.length === 0) {
        window.addEventListener('resize', ResizeObserver._handleResize, true);
      }

      var subscribed = true;

      ResizeObserver._resizeListeners.push(listener);

      return function removeSResizeListener() {
        if (!subscribed) return;
        subscribed = false;

        ResizeObserver._resizeListeners.splice(ResizeObserver._resizeListeners.indexOf(listener), 1);

        if (ResizeObserver._resizeListeners.length === 0) {
          window.removeEventListener('resize', ResizeObserver._handleResize, true);
        }
      };
    }
  }]);

  function ResizeObserver(props, context) {
    var _this;

    _classCallCheck(this, ResizeObserver);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ResizeObserver).call(this, props, context));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_expandRef", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_shrinkRef", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_node", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_lastWidth", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_lastHeight", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_removeResize", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_removeScroll", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_lastRect", {});

    _assertThisInitialized(_assertThisInitialized(_this))._handleScroll = _this._handleScroll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _assertThisInitialized(_assertThisInitialized(_this))._reflow = _this._reflow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _assertThisInitialized(_assertThisInitialized(_this))._handleRef = _this._handleRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _assertThisInitialized(_assertThisInitialized(_this))._handleExpandRef = _this._handleExpandRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _assertThisInitialized(_assertThisInitialized(_this))._handleShrinkRef = _this._handleShrinkRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ResizeObserver, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._reflow();

      this._removeScroll = ResizeObserver.addScrollListener(this._handleScroll);

      if (this.props.onPosition || this.props.onReflow) {
        this._removeResize = ResizeObserver.addResizeListener(this._reflow);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if ((nextProps.onPosition || nextProps.onReflow) && !this._removeResize) {
        this._removeResize = ResizeObserver.addResizeListener(this._reflow);
      } else if (!(nextProps.onPosition || nextProps.onReflow) && this._removeResize) {
        this._removeResize();

        this._removeResize = null;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this._removeScroll) {
        this._removeScroll();

        this._removeScroll = null;
      }

      if (this._removeResize) {
        this._removeResize();

        this._removeResize = null;
      }
    }
  }, {
    key: "_handleScroll",
    value: function _handleScroll(event) {
      if ((this.props.onPosition || this.props.onReflow || this.props.onResize) && (this._globalScollTarget(event.target) || this._refScrollTarget(event.target) || this._ancestorScollTarget(event.target))) {
        this._reflow();
      }
    }
  }, {
    key: "_globalScollTarget",
    value: function _globalScollTarget(target) {
      return (this.props.onPosition || this.props.onReflow) && (target === document || target === document.documentElement || target === document.body);
    }
  }, {
    key: "_refScrollTarget",
    value: function _refScrollTarget(target) {
      if (target === this._expandRef || target === this._shrinkRef) {
        var width = target.offsetWidth;
        var height = target.offsetHeight;

        if (width !== this._lastWidth || height !== this._lastHeight) {
          this._lastWidth = width;
          this._lastHeight = height;

          this._reset(this._expandRef);

          this._reset(this._shrinkRef);

          return true;
        }
      }

      return false;
    }
  }, {
    key: "_ancestorScollTarget",
    value: function _ancestorScollTarget(target) {
      return (this.props.onPosition || this.props.onReflow) && this._node && isAncestor(this._node, target);
    }
  }, {
    key: "_reflow",
    value: function _reflow() {
      if (!this._node || !(this._node.parentNode instanceof Element)) return;

      var rect = this._node.parentNode.getBoundingClientRect();

      var sizeChanged = rect.width !== this._lastRect.width || rect.height !== this._lastRect.height;
      var positionChanged = rect.top !== this._lastRect.top || rect.left !== this._lastRect.left;
      this._lastRect = rect;

      if (sizeChanged && this.props.onResize) {
        this.props.onResize(rect);
      }

      if (positionChanged && this.props.onPosition) {
        this.props.onPosition(rect);
      }

      if ((sizeChanged || positionChanged) && this.props.onReflow) {
        this.props.onReflow(rect);
      }
    }
  }, {
    key: "_reset",
    value: function _reset(node) {
      if (node) {
        node.scrollLeft = 100000;
        node.scrollTop = 100000;
      }
    }
  }, {
    key: "_handleRef",
    value: function _handleRef(node) {
      this._node = node;
    }
  }, {
    key: "_handleExpandRef",
    value: function _handleExpandRef(node) {
      this._reset(node);

      this._expandRef = node;
    }
  }, {
    key: "_handleShrinkRef",
    value: function _handleShrinkRef(node) {
      this._reset(node);

      this._shrinkRef = node;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.onResize || this.props.onReflow) {
        return _react.default.createElement("div", {
          style: style,
          ref: this._handleRef
        }, _react.default.createElement("div", {
          ref: this._handleExpandRef,
          style: style
        }, _react.default.createElement("div", {
          style: _objectSpread({}, styleChild, {
            width: 100000,
            height: 100000
          })
        })), _react.default.createElement("div", {
          ref: this._handleShrinkRef,
          style: style
        }, _react.default.createElement("div", {
          style: _objectSpread({}, styleChild, {
            width: '200%',
            height: '200%'
          })
        })));
      }

      return _react.default.createElement("noscript", null);
    }
  }]);

  _inherits(ResizeObserver, _React$Component);

  return ResizeObserver;
}(_react.default.Component);

_defineProperty(ResizeObserver, "displayName", 'ResizeObserver');

_defineProperty(ResizeObserver, "_scrollListeners", []);

_defineProperty(ResizeObserver, "_resizeListeners", []);

var _default = ResizeObserver;
exports.default = _default;
//# sourceMappingURL=ResizeObserver.js.map