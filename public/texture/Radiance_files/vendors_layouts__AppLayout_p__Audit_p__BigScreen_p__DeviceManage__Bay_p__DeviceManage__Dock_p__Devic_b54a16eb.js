(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~layouts__AppLayout~p__Audit~p__BigScreen~p__DeviceManage__Bay~p__DeviceManage__Dock~p__Devic~b54a16eb"],{

/***/ "./node_modules/antd/es/input/ClearableLabeledInput.js":
/*!*************************************************************!*\
  !*** ./node_modules/antd/es/input/ClearableLabeledInput.js ***!
  \*************************************************************/
/*! exports provided: hasPrefixSuffix, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasPrefixSuffix", function() { return hasPrefixSuffix; });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createSuper */ "./node_modules/@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ant_design_icons_es_icons_CloseCircleFilled__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ant-design/icons/es/icons/CloseCircleFilled */ "./node_modules/@ant-design/icons/es/icons/CloseCircleFilled.js");
/* harmony import */ var _util_type__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_util/type */ "./node_modules/antd/es/_util/type.js");
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Input */ "./node_modules/antd/es/input/Input.js");
/* harmony import */ var _util_reactNode__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../_util/reactNode */ "./node_modules/antd/es/_util/reactNode.js");











var ClearableInputType = Object(_util_type__WEBPACK_IMPORTED_MODULE_8__["tuple"])('text', 'input');
function hasPrefixSuffix(props) {
  return !!(props.prefix || props.suffix || props.allowClear);
}

function hasAddon(props) {
  return !!(props.addonBefore || props.addonAfter);
}

var ClearableLabeledInput = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(ClearableLabeledInput, _React$Component);

  var _super = Object(_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__["default"])(ClearableLabeledInput);

  function ClearableLabeledInput() {
    var _this;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ClearableLabeledInput);

    _this = _super.apply(this, arguments);
    /** @private Do Not use out of this class. We do not promise this is always keep. */

    _this.containerRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createRef"]();

    _this.onInputMouseUp = function (e) {
      var _a;

      if ((_a = _this.containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
        var triggerFocus = _this.props.triggerFocus;
        triggerFocus === null || triggerFocus === void 0 ? void 0 : triggerFocus();
      }
    };

    return _this;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(ClearableLabeledInput, [{
    key: "renderClearIcon",
    value: function renderClearIcon(prefixCls) {
      var _this$props = this.props,
          allowClear = _this$props.allowClear,
          value = _this$props.value,
          disabled = _this$props.disabled,
          readOnly = _this$props.readOnly,
          handleReset = _this$props.handleReset;

      if (!allowClear) {
        return null;
      }

      var needClear = !disabled && !readOnly && value;
      var className = "".concat(prefixCls, "-clear-icon");
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_ant_design_icons_es_icons_CloseCircleFilled__WEBPACK_IMPORTED_MODULE_7__["default"], {
        onClick: handleReset,
        className: classnames__WEBPACK_IMPORTED_MODULE_6___default()(Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, "".concat(className, "-hidden"), !needClear), className),
        role: "button"
      });
    }
  }, {
    key: "renderSuffix",
    value: function renderSuffix(prefixCls) {
      var _this$props2 = this.props,
          suffix = _this$props2.suffix,
          allowClear = _this$props2.allowClear;

      if (suffix || allowClear) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", {
          className: "".concat(prefixCls, "-suffix")
        }, this.renderClearIcon(prefixCls), suffix);
      }

      return null;
    }
  }, {
    key: "renderLabeledIcon",
    value: function renderLabeledIcon(prefixCls, element) {
      var _classNames2;

      var _this$props3 = this.props,
          focused = _this$props3.focused,
          value = _this$props3.value,
          prefix = _this$props3.prefix,
          className = _this$props3.className,
          size = _this$props3.size,
          suffix = _this$props3.suffix,
          disabled = _this$props3.disabled,
          allowClear = _this$props3.allowClear,
          direction = _this$props3.direction,
          style = _this$props3.style,
          readOnly = _this$props3.readOnly,
          bordered = _this$props3.bordered;
      var suffixNode = this.renderSuffix(prefixCls);

      if (!hasPrefixSuffix(this.props)) {
        return Object(_util_reactNode__WEBPACK_IMPORTED_MODULE_10__["cloneElement"])(element, {
          value: value
        });
      }

      var prefixNode = prefix ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", {
        className: "".concat(prefixCls, "-prefix")
      }, prefix) : null;
      var affixWrapperCls = classnames__WEBPACK_IMPORTED_MODULE_6___default()("".concat(prefixCls, "-affix-wrapper"), (_classNames2 = {}, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames2, "".concat(prefixCls, "-affix-wrapper-focused"), focused), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames2, "".concat(prefixCls, "-affix-wrapper-disabled"), disabled), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames2, "".concat(prefixCls, "-affix-wrapper-sm"), size === 'small'), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames2, "".concat(prefixCls, "-affix-wrapper-lg"), size === 'large'), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames2, "".concat(prefixCls, "-affix-wrapper-input-with-clear-btn"), suffix && allowClear && value), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames2, "".concat(prefixCls, "-affix-wrapper-rtl"), direction === 'rtl'), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames2, "".concat(prefixCls, "-affix-wrapper-readonly"), readOnly), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames2, "".concat(prefixCls, "-affix-wrapper-borderless"), !bordered), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames2, "".concat(className), !hasAddon(this.props) && className), _classNames2));
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", {
        ref: this.containerRef,
        className: affixWrapperCls,
        style: style,
        onMouseUp: this.onInputMouseUp
      }, prefixNode, Object(_util_reactNode__WEBPACK_IMPORTED_MODULE_10__["cloneElement"])(element, {
        style: null,
        value: value,
        className: Object(_Input__WEBPACK_IMPORTED_MODULE_9__["getInputClassName"])(prefixCls, bordered, size, disabled)
      }), suffixNode);
    }
  }, {
    key: "renderInputWithLabel",
    value: function renderInputWithLabel(prefixCls, labeledElement) {
      var _classNames4;

      var _this$props4 = this.props,
          addonBefore = _this$props4.addonBefore,
          addonAfter = _this$props4.addonAfter,
          style = _this$props4.style,
          size = _this$props4.size,
          className = _this$props4.className,
          direction = _this$props4.direction; // Not wrap when there is not addons

      if (!hasAddon(this.props)) {
        return labeledElement;
      }

      var wrapperClassName = "".concat(prefixCls, "-group");
      var addonClassName = "".concat(wrapperClassName, "-addon");
      var addonBeforeNode = addonBefore ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", {
        className: addonClassName
      }, addonBefore) : null;
      var addonAfterNode = addonAfter ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", {
        className: addonClassName
      }, addonAfter) : null;
      var mergedWrapperClassName = classnames__WEBPACK_IMPORTED_MODULE_6___default()("".concat(prefixCls, "-wrapper"), wrapperClassName, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, "".concat(wrapperClassName, "-rtl"), direction === 'rtl'));
      var mergedGroupClassName = classnames__WEBPACK_IMPORTED_MODULE_6___default()("".concat(prefixCls, "-group-wrapper"), (_classNames4 = {}, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames4, "".concat(prefixCls, "-group-wrapper-sm"), size === 'small'), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames4, "".concat(prefixCls, "-group-wrapper-lg"), size === 'large'), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames4, "".concat(prefixCls, "-group-wrapper-rtl"), direction === 'rtl'), _classNames4), className); // Need another wrapper for changing display:table to display:inline-block
      // and put style prop in wrapper

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", {
        className: mergedGroupClassName,
        style: style
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", {
        className: mergedWrapperClassName
      }, addonBeforeNode, Object(_util_reactNode__WEBPACK_IMPORTED_MODULE_10__["cloneElement"])(labeledElement, {
        style: null
      }), addonAfterNode));
    }
  }, {
    key: "renderTextAreaWithClearIcon",
    value: function renderTextAreaWithClearIcon(prefixCls, element) {
      var _classNames5;

      var _this$props5 = this.props,
          value = _this$props5.value,
          allowClear = _this$props5.allowClear,
          className = _this$props5.className,
          style = _this$props5.style,
          direction = _this$props5.direction,
          bordered = _this$props5.bordered;

      if (!allowClear) {
        return Object(_util_reactNode__WEBPACK_IMPORTED_MODULE_10__["cloneElement"])(element, {
          value: value
        });
      }

      var affixWrapperCls = classnames__WEBPACK_IMPORTED_MODULE_6___default()("".concat(prefixCls, "-affix-wrapper"), "".concat(prefixCls, "-affix-wrapper-textarea-with-clear-btn"), (_classNames5 = {}, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames5, "".concat(prefixCls, "-affix-wrapper-rtl"), direction === 'rtl'), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames5, "".concat(prefixCls, "-affix-wrapper-borderless"), !bordered), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames5, "".concat(className), !hasAddon(this.props) && className), _classNames5));
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("span", {
        className: affixWrapperCls,
        style: style
      }, Object(_util_reactNode__WEBPACK_IMPORTED_MODULE_10__["cloneElement"])(element, {
        style: null,
        value: value
      }), this.renderClearIcon(prefixCls));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          prefixCls = _this$props6.prefixCls,
          inputType = _this$props6.inputType,
          element = _this$props6.element;

      if (inputType === ClearableInputType[0]) {
        return this.renderTextAreaWithClearIcon(prefixCls, element);
      }

      return this.renderInputWithLabel(prefixCls, this.renderLabeledIcon(prefixCls, element));
    }
  }]);

  return ClearableLabeledInput;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ClearableLabeledInput);

/***/ }),

/***/ "./node_modules/antd/es/input/Input.js":
/*!*********************************************!*\
  !*** ./node_modules/antd/es/input/Input.js ***!
  \*********************************************/
/*! exports provided: fixControlledValue, resolveOnChange, getInputClassName, triggerFocus, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixControlledValue", function() { return fixControlledValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveOnChange", function() { return resolveOnChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInputClassName", function() { return getInputClassName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerFocus", function() { return triggerFocus; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createSuper */ "./node_modules/@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var rc_util_es_omit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rc-util/es/omit */ "./node_modules/rc-util/es/omit.js");
/* harmony import */ var _ClearableLabeledInput__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ClearableLabeledInput */ "./node_modules/antd/es/input/ClearableLabeledInput.js");
/* harmony import */ var _config_provider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../config-provider */ "./node_modules/antd/es/config-provider/index.js");
/* harmony import */ var _config_provider_SizeContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../config-provider/SizeContext */ "./node_modules/antd/es/config-provider/SizeContext.js");
/* harmony import */ var _util_devWarning__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../_util/devWarning */ "./node_modules/antd/es/_util/devWarning.js");













function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }

  return value;
}
function resolveOnChange(target, e, onChange, targetValue) {
  if (!onChange) {
    return;
  }

  var event = e;
  var originalInputValue = target.value;

  if (e.type === 'click') {
    // click clear icon
    event = Object.create(e);
    event.target = target;
    event.currentTarget = target; // change target ref value cause e.target.value should be '' when clear input

    target.value = '';
    onChange(event); // reset target ref value

    target.value = originalInputValue;
    return;
  } // Trigger by composition event, this means we need force change the input value


  if (targetValue !== undefined) {
    event = Object.create(e);
    event.target = target;
    event.currentTarget = target;
    target.value = targetValue;
    onChange(event);
    return;
  }

  onChange(event);
}
function getInputClassName(prefixCls, bordered, size, disabled, direction) {
  var _classNames;

  return classnames__WEBPACK_IMPORTED_MODULE_7___default()(prefixCls, (_classNames = {}, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(_classNames, "".concat(prefixCls, "-disabled"), disabled), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(_classNames, "".concat(prefixCls, "-borderless"), !bordered), _classNames));
}
function triggerFocus(element, option) {
  if (!element) return;
  element.focus(option); // Selection content

  var _ref = option || {},
      cursor = _ref.cursor;

  if (cursor) {
    var len = element.value.length;

    switch (cursor) {
      case 'start':
        element.setSelectionRange(0, 0);
        break;

      case 'end':
        element.setSelectionRange(len, len);
        break;

      default:
        element.setSelectionRange(0, len);
    }
  }
}

var Input = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Input, _React$Component);

  var _super = Object(_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__["default"])(Input);

  function Input(props) {
    var _this;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Input);

    _this = _super.call(this, props);
    _this.direction = 'ltr';

    _this.focus = function (option) {
      triggerFocus(_this.input, option);
    };

    _this.saveClearableInput = function (input) {
      _this.clearableInput = input;
    };

    _this.saveInput = function (input) {
      _this.input = input;
    };

    _this.onFocus = function (e) {
      var onFocus = _this.props.onFocus;

      _this.setState({
        focused: true
      }, _this.clearPasswordValueAttribute);

      onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
    };

    _this.onBlur = function (e) {
      var onBlur = _this.props.onBlur;

      _this.setState({
        focused: false
      }, _this.clearPasswordValueAttribute);

      onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
    };

    _this.handleReset = function (e) {
      _this.setValue('', function () {
        _this.focus();
      });

      resolveOnChange(_this.input, e, _this.props.onChange);
    };

    _this.renderInput = function (prefixCls, size, bordered) {
      var input = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var _this$props = _this.props,
          className = _this$props.className,
          addonBefore = _this$props.addonBefore,
          addonAfter = _this$props.addonAfter,
          customizeSize = _this$props.size,
          disabled = _this$props.disabled; // Fix https://fb.me/react-unknown-prop

      var otherProps = Object(rc_util_es_omit__WEBPACK_IMPORTED_MODULE_8__["default"])(_this.props, ['prefixCls', 'onPressEnter', 'addonBefore', 'addonAfter', 'prefix', 'suffix', 'allowClear', // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      'defaultValue', 'size', 'inputType', 'bordered']);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"]("input", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
        autoComplete: input.autoComplete
      }, otherProps, {
        onChange: _this.handleChange,
        onFocus: _this.onFocus,
        onBlur: _this.onBlur,
        onKeyDown: _this.handleKeyDown,
        className: classnames__WEBPACK_IMPORTED_MODULE_7___default()(getInputClassName(prefixCls, bordered, customizeSize || size, disabled, _this.direction), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])({}, className, className && !addonBefore && !addonAfter)),
        ref: _this.saveInput
      }));
    };

    _this.clearPasswordValueAttribute = function () {
      // https://github.com/ant-design/ant-design/issues/20541
      _this.removePasswordTimeout = setTimeout(function () {
        if (_this.input && _this.input.getAttribute('type') === 'password' && _this.input.hasAttribute('value')) {
          _this.input.removeAttribute('value');
        }
      });
    };

    _this.handleChange = function (e) {
      _this.setValue(e.target.value, _this.clearPasswordValueAttribute);

      resolveOnChange(_this.input, e, _this.props.onChange);
    };

    _this.handleKeyDown = function (e) {
      var _this$props2 = _this.props,
          onPressEnter = _this$props2.onPressEnter,
          onKeyDown = _this$props2.onKeyDown;

      if (onPressEnter && e.keyCode === 13) {
        onPressEnter(e);
      }

      onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
    };

    _this.renderComponent = function (_ref2) {
      var getPrefixCls = _ref2.getPrefixCls,
          direction = _ref2.direction,
          input = _ref2.input;
      var _this$state = _this.state,
          value = _this$state.value,
          focused = _this$state.focused;
      var _this$props3 = _this.props,
          customizePrefixCls = _this$props3.prefixCls,
          _this$props3$bordered = _this$props3.bordered,
          bordered = _this$props3$bordered === void 0 ? true : _this$props3$bordered;
      var prefixCls = getPrefixCls('input', customizePrefixCls);
      _this.direction = direction;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_config_provider_SizeContext__WEBPACK_IMPORTED_MODULE_11__["default"].Consumer, null, function (size) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_ClearableLabeledInput__WEBPACK_IMPORTED_MODULE_9__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
          size: size
        }, _this.props, {
          prefixCls: prefixCls,
          inputType: "input",
          value: fixControlledValue(value),
          element: _this.renderInput(prefixCls, size, bordered, input),
          handleReset: _this.handleReset,
          ref: _this.saveClearableInput,
          direction: direction,
          focused: focused,
          triggerFocus: _this.focus,
          bordered: bordered
        }));
      });
    };

    var value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    _this.state = {
      value: value,
      focused: false,
      // eslint-disable-next-line react/no-unused-state
      prevValue: props.value
    };
    return _this;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Input, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.clearPasswordValueAttribute();
    } // Since polyfill `getSnapshotBeforeUpdate` need work with `componentDidUpdate`.
    // We keep an empty function here.

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(prevProps) {
      if (Object(_ClearableLabeledInput__WEBPACK_IMPORTED_MODULE_9__["hasPrefixSuffix"])(prevProps) !== Object(_ClearableLabeledInput__WEBPACK_IMPORTED_MODULE_9__["hasPrefixSuffix"])(this.props)) {
        Object(_util_devWarning__WEBPACK_IMPORTED_MODULE_12__["default"])(this.input !== document.activeElement, 'Input', "When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ");
      }

      return null;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.removePasswordTimeout) {
        clearTimeout(this.removePasswordTimeout);
      }
    }
  }, {
    key: "blur",
    value: function blur() {
      this.input.blur();
    }
  }, {
    key: "setSelectionRange",
    value: function setSelectionRange(start, end, direction) {
      this.input.setSelectionRange(start, end, direction);
    }
  }, {
    key: "select",
    value: function select() {
      this.input.select();
    }
  }, {
    key: "setValue",
    value: function setValue(value, callback) {
      if (this.props.value === undefined) {
        this.setState({
          value: value
        }, callback);
      } else {
        callback === null || callback === void 0 ? void 0 : callback();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_6__["createElement"](_config_provider__WEBPACK_IMPORTED_MODULE_10__["ConfigConsumer"], null, this.renderComponent);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, _ref3) {
      var prevValue = _ref3.prevValue;
      var newState = {
        prevValue: nextProps.value
      };

      if (nextProps.value !== undefined || prevValue !== nextProps.value) {
        newState.value = nextProps.value;
      }

      return newState;
    }
  }]);

  return Input;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

Input.defaultProps = {
  type: 'text'
};
/* harmony default export */ __webpack_exports__["default"] = (Input);

/***/ }),

/***/ "./node_modules/antd/es/input/TextArea.js":
/*!************************************************!*\
  !*** ./node_modules/antd/es/input/TextArea.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var rc_textarea__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rc-textarea */ "./node_modules/rc-textarea/es/index.js");
/* harmony import */ var rc_util_es_omit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rc-util/es/omit */ "./node_modules/rc-util/es/omit.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var rc_util_es_hooks_useMergedState__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rc-util/es/hooks/useMergedState */ "./node_modules/rc-util/es/hooks/useMergedState.js");
/* harmony import */ var _ClearableLabeledInput__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ClearableLabeledInput */ "./node_modules/antd/es/input/ClearableLabeledInput.js");
/* harmony import */ var _config_provider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../config-provider */ "./node_modules/antd/es/config-provider/index.js");
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Input */ "./node_modules/antd/es/input/Input.js");
/* harmony import */ var _config_provider_SizeContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../config-provider/SizeContext */ "./node_modules/antd/es/config-provider/SizeContext.js");






var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};











function fixEmojiLength(value, maxLength) {
  return Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__["default"])(value || '').slice(0, maxLength).join('');
}

var TextArea = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["forwardRef"](function (_a, ref) {
  var _classNames;

  var customizePrefixCls = _a.prefixCls,
      _a$bordered = _a.bordered,
      bordered = _a$bordered === void 0 ? true : _a$bordered,
      _a$showCount = _a.showCount,
      showCount = _a$showCount === void 0 ? false : _a$showCount,
      maxLength = _a.maxLength,
      className = _a.className,
      style = _a.style,
      customizeSize = _a.size,
      onCompositionStart = _a.onCompositionStart,
      onCompositionEnd = _a.onCompositionEnd,
      onChange = _a.onChange,
      props = __rest(_a, ["prefixCls", "bordered", "showCount", "maxLength", "className", "style", "size", "onCompositionStart", "onCompositionEnd", "onChange"]);

  var _React$useContext = react__WEBPACK_IMPORTED_MODULE_5__["useContext"](_config_provider__WEBPACK_IMPORTED_MODULE_11__["ConfigContext"]),
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var size = react__WEBPACK_IMPORTED_MODULE_5__["useContext"](_config_provider_SizeContext__WEBPACK_IMPORTED_MODULE_13__["default"]);
  var innerRef = react__WEBPACK_IMPORTED_MODULE_5__["useRef"](null);
  var clearableInputRef = react__WEBPACK_IMPORTED_MODULE_5__["useRef"](null);

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_5__["useState"](false),
      _React$useState2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_React$useState, 2),
      compositing = _React$useState2[0],
      setCompositing = _React$useState2[1];

  var _useMergedState = Object(rc_util_es_hooks_useMergedState__WEBPACK_IMPORTED_MODULE_9__["default"])(props.defaultValue, {
    value: props.value
  }),
      _useMergedState2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__["default"])(_useMergedState, 2),
      value = _useMergedState2[0],
      setValue = _useMergedState2[1];

  var handleSetValue = function handleSetValue(val, callback) {
    if (props.value === undefined) {
      setValue(val);
      callback === null || callback === void 0 ? void 0 : callback();
    }
  }; // =========================== Value Update ===========================
  // Max length value


  var hasMaxLength = Number(maxLength) > 0;

  var onInternalCompositionStart = function onInternalCompositionStart(e) {
    setCompositing(true);
    onCompositionStart === null || onCompositionStart === void 0 ? void 0 : onCompositionStart(e);
  };

  var onInternalCompositionEnd = function onInternalCompositionEnd(e) {
    setCompositing(false);
    var triggerValue = e.currentTarget.value;

    if (hasMaxLength) {
      triggerValue = fixEmojiLength(triggerValue, maxLength);
    } // Patch composition onChange when value changed


    if (triggerValue !== value) {
      handleSetValue(triggerValue);
      Object(_Input__WEBPACK_IMPORTED_MODULE_12__["resolveOnChange"])(innerRef.current, e, onChange, triggerValue);
    }

    onCompositionEnd === null || onCompositionEnd === void 0 ? void 0 : onCompositionEnd(e);
  };

  var handleChange = function handleChange(e) {
    var triggerValue = e.target.value;

    if (!compositing && hasMaxLength) {
      triggerValue = fixEmojiLength(triggerValue, maxLength);
    }

    handleSetValue(triggerValue);
    Object(_Input__WEBPACK_IMPORTED_MODULE_12__["resolveOnChange"])(innerRef.current, e, onChange);
  }; // ============================== Reset ===============================


  var handleReset = function handleReset(e) {
    handleSetValue('', function () {
      var _a;

      (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    });
    Object(_Input__WEBPACK_IMPORTED_MODULE_12__["resolveOnChange"])(innerRef.current, e, onChange);
  };

  var prefixCls = getPrefixCls('input', customizePrefixCls);
  react__WEBPACK_IMPORTED_MODULE_5__["useImperativeHandle"](ref, function () {
    var _a;

    return {
      resizableTextArea: (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.resizableTextArea,
      focus: function focus(option) {
        var _a, _b;

        Object(_Input__WEBPACK_IMPORTED_MODULE_12__["triggerFocus"])((_b = (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.resizableTextArea) === null || _b === void 0 ? void 0 : _b.textArea, option);
      },
      blur: function blur() {
        var _a;

        return (_a = innerRef.current) === null || _a === void 0 ? void 0 : _a.blur();
      }
    };
  });
  var textArea = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"](rc_textarea__WEBPACK_IMPORTED_MODULE_6__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, Object(rc_util_es_omit__WEBPACK_IMPORTED_MODULE_7__["default"])(props, ['allowClear']), {
    className: classnames__WEBPACK_IMPORTED_MODULE_8___default()((_classNames = {}, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(_classNames, "".concat(prefixCls, "-borderless"), !bordered), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(_classNames, className, className && !showCount), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(_classNames, "".concat(prefixCls, "-sm"), size === 'small' || customizeSize === 'small'), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(_classNames, "".concat(prefixCls, "-lg"), size === 'large' || customizeSize === 'large'), _classNames)),
    style: showCount ? undefined : style,
    prefixCls: prefixCls,
    onCompositionStart: onInternalCompositionStart,
    onChange: handleChange,
    onCompositionEnd: onInternalCompositionEnd,
    ref: innerRef
  }));
  var val = Object(_Input__WEBPACK_IMPORTED_MODULE_12__["fixControlledValue"])(value);

  if (!compositing && hasMaxLength && (props.value === null || props.value === undefined)) {
    // fix #27612 将value转为数组进行截取，解决 '😂'.length === 2 等emoji表情导致的截取乱码的问题
    val = fixEmojiLength(val, maxLength);
  } // TextArea


  var textareaNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_ClearableLabeledInput__WEBPACK_IMPORTED_MODULE_10__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
    prefixCls: prefixCls,
    direction: direction,
    inputType: "text",
    value: val,
    element: textArea,
    handleReset: handleReset,
    ref: clearableInputRef,
    bordered: bordered
  })); // Only show text area wrapper when needed

  if (showCount) {
    var valueLength = Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_4__["default"])(val).length;

    var dataCount = '';

    if (Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(showCount) === 'object') {
      dataCount = showCount.formatter({
        count: valueLength,
        maxLength: maxLength
      });
    } else {
      dataCount = "".concat(valueLength).concat(hasMaxLength ? " / ".concat(maxLength) : '');
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"]("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_8___default()("".concat(prefixCls, "-textarea"), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, "".concat(prefixCls, "-textarea-rtl"), direction === 'rtl'), "".concat(prefixCls, "-textarea-show-count"), className),
      style: style,
      "data-count": dataCount
    }, textareaNode);
  }

  return textareaNode;
});
/* harmony default export */ __webpack_exports__["default"] = (TextArea);

/***/ }),

/***/ "./node_modules/antd/es/input/style/index.js":
/*!***************************************************!*\
  !*** ./node_modules/antd/es/input/style/index.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../style/index.less */ "./node_modules/antd/es/style/index.less");
/* harmony import */ var _style_index_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_index_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.less */ "./node_modules/antd/es/input/style/index.less");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _button_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../button/style */ "./node_modules/antd/es/button/style/index.js");

 // style dependencies



/***/ }),

/***/ "./node_modules/antd/es/input/style/index.less":
/*!*****************************************************!*\
  !*** ./node_modules/antd/es/input/style/index.less ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1624783067198
      var cssReload = __webpack_require__(/*! ./node_modules/@umijs/bundler-webpack/lib/webpack/plugins/mini-css-extract-plugin/src/hmr/hotModuleReplacement.js */ "./node_modules/@umijs/bundler-webpack/lib/webpack/plugins/mini-css-extract-plugin/src/hmr/hotModuleReplacement.js")(module.i, {"publicPath":"./","hmr":true,"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/rc-textarea/es/ResizableTextArea.js":
/*!**********************************************************!*\
  !*** ./node_modules/rc-textarea/es/ResizableTextArea.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread2 */ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createSuper */ "./node_modules/@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var rc_resize_observer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rc-resize-observer */ "./node_modules/rc-resize-observer/es/index.js");
/* harmony import */ var rc_util_es_omit__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rc-util/es/omit */ "./node_modules/rc-util/es/omit.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _calculateNodeHeight__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./calculateNodeHeight */ "./node_modules/rc-textarea/es/calculateNodeHeight.js");











 // eslint-disable-next-line @typescript-eslint/naming-convention

var RESIZE_STATUS;

(function (RESIZE_STATUS) {
  RESIZE_STATUS[RESIZE_STATUS["NONE"] = 0] = "NONE";
  RESIZE_STATUS[RESIZE_STATUS["RESIZING"] = 1] = "RESIZING";
  RESIZE_STATUS[RESIZE_STATUS["RESIZED"] = 2] = "RESIZED";
})(RESIZE_STATUS || (RESIZE_STATUS = {}));

var ResizableTextArea = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(ResizableTextArea, _React$Component);

  var _super = Object(_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_6__["default"])(ResizableTextArea);

  function ResizableTextArea(props) {
    var _this;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, ResizableTextArea);

    _this = _super.call(this, props);

    _this.saveTextArea = function (textArea) {
      _this.textArea = textArea;
    };

    _this.handleResize = function (size) {
      var resizeStatus = _this.state.resizeStatus;
      var _this$props = _this.props,
          autoSize = _this$props.autoSize,
          onResize = _this$props.onResize;

      if (resizeStatus !== RESIZE_STATUS.NONE) {
        return;
      }

      if (typeof onResize === 'function') {
        onResize(size);
      }

      if (autoSize) {
        _this.resizeOnNextFrame();
      }
    };

    _this.resizeOnNextFrame = function () {
      cancelAnimationFrame(_this.nextFrameActionId);
      _this.nextFrameActionId = requestAnimationFrame(_this.resizeTextarea);
    };

    _this.resizeTextarea = function () {
      var autoSize = _this.props.autoSize;

      if (!autoSize || !_this.textArea) {
        return;
      }

      var minRows = autoSize.minRows,
          maxRows = autoSize.maxRows;
      var textareaStyles = Object(_calculateNodeHeight__WEBPACK_IMPORTED_MODULE_11__["default"])(_this.textArea, false, minRows, maxRows);

      _this.setState({
        textareaStyles: textareaStyles,
        resizeStatus: RESIZE_STATUS.RESIZING
      }, function () {
        cancelAnimationFrame(_this.resizeFrameId);
        _this.resizeFrameId = requestAnimationFrame(function () {
          _this.setState({
            resizeStatus: RESIZE_STATUS.RESIZED
          }, function () {
            _this.resizeFrameId = requestAnimationFrame(function () {
              _this.setState({
                resizeStatus: RESIZE_STATUS.NONE
              });

              _this.fixFirefoxAutoScroll();
            });
          });
        });
      });
    };

    _this.renderTextArea = function () {
      var _this$props2 = _this.props,
          _this$props2$prefixCl = _this$props2.prefixCls,
          prefixCls = _this$props2$prefixCl === void 0 ? 'rc-textarea' : _this$props2$prefixCl,
          autoSize = _this$props2.autoSize,
          onResize = _this$props2.onResize,
          className = _this$props2.className,
          disabled = _this$props2.disabled;
      var _this$state = _this.state,
          textareaStyles = _this$state.textareaStyles,
          resizeStatus = _this$state.resizeStatus;
      var otherProps = Object(rc_util_es_omit__WEBPACK_IMPORTED_MODULE_9__["default"])(_this.props, ['prefixCls', 'onPressEnter', 'autoSize', 'defaultValue', 'onResize']);
      var cls = classnames__WEBPACK_IMPORTED_MODULE_10___default()(prefixCls, className, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, "".concat(prefixCls, "-disabled"), disabled)); // Fix https://github.com/ant-design/ant-design/issues/6776
      // Make sure it could be reset when using form.getFieldDecorator

      if ('value' in otherProps) {
        otherProps.value = otherProps.value || '';
      }

      var style = Object(_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__["default"])({}, _this.props.style), textareaStyles), resizeStatus === RESIZE_STATUS.RESIZING ? // React will warning when mix `overflow` & `overflowY`.
      // We need to define this separately.
      {
        overflowX: 'hidden',
        overflowY: 'hidden'
      } : null);

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__["createElement"](rc_resize_observer__WEBPACK_IMPORTED_MODULE_8__["default"], {
        onResize: _this.handleResize,
        disabled: !(autoSize || onResize)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("textarea", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, otherProps, {
        className: cls,
        style: style,
        ref: _this.saveTextArea
      })));
    };

    _this.state = {
      textareaStyles: {},
      resizeStatus: RESIZE_STATUS.NONE
    };
    return _this;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(ResizableTextArea, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resizeTextarea();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Re-render with the new content then recalculate the height as required.
      if (prevProps.value !== this.props.value) {
        this.resizeTextarea();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      cancelAnimationFrame(this.nextFrameActionId);
      cancelAnimationFrame(this.resizeFrameId);
    } // https://github.com/ant-design/ant-design/issues/21870

  }, {
    key: "fixFirefoxAutoScroll",
    value: function fixFirefoxAutoScroll() {
      try {
        if (document.activeElement === this.textArea) {
          var currentStart = this.textArea.selectionStart;
          var currentEnd = this.textArea.selectionEnd;
          this.textArea.setSelectionRange(currentStart, currentEnd);
        }
      } catch (e) {// Fix error in Chrome:
        // Failed to read the 'selectionStart' property from 'HTMLInputElement'
        // http://stackoverflow.com/q/21177489/3040605
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderTextArea();
    }
  }]);

  return ResizableTextArea;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (ResizableTextArea);

/***/ }),

/***/ "./node_modules/rc-textarea/es/calculateNodeHeight.js":
/*!************************************************************!*\
  !*** ./node_modules/rc-textarea/es/calculateNodeHeight.js ***!
  \************************************************************/
/*! exports provided: calculateNodeStyling, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateNodeStyling", function() { return calculateNodeStyling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return calculateNodeHeight; });
// Thanks to https://github.com/andreypopp/react-textarea-autosize/

/**
 * calculateNodeHeight(uiTextNode, useCache = false)
 */
var HIDDEN_TEXTAREA_STYLE = "\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n";
var SIZING_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'font-variant', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];
var computedStyleCache = {};
var hiddenTextarea;
function calculateNodeStyling(node) {
  var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var nodeRef = node.getAttribute('id') || node.getAttribute('data-reactid') || node.getAttribute('name');

  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }

  var style = window.getComputedStyle(node);
  var boxSizing = style.getPropertyValue('box-sizing') || style.getPropertyValue('-moz-box-sizing') || style.getPropertyValue('-webkit-box-sizing');
  var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));
  var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));
  var sizingStyle = SIZING_STYLE.map(function (name) {
    return "".concat(name, ":").concat(style.getPropertyValue(name));
  }).join(';');
  var nodeInfo = {
    sizingStyle: sizingStyle,
    paddingSize: paddingSize,
    borderSize: borderSize,
    boxSizing: boxSizing
  };

  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }

  return nodeInfo;
}
function calculateNodeHeight(uiTextNode) {
  var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var minRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var maxRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('tab-index', '-1');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    document.body.appendChild(hiddenTextarea);
  } // Fix wrap="off" issue
  // https://github.com/ant-design/ant-design/issues/6577


  if (uiTextNode.getAttribute('wrap')) {
    hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap'));
  } else {
    hiddenTextarea.removeAttribute('wrap');
  } // Copy all CSS properties that have an impact on the height of the content in
  // the textbox


  var _calculateNodeStyling = calculateNodeStyling(uiTextNode, useCache),
      paddingSize = _calculateNodeStyling.paddingSize,
      borderSize = _calculateNodeStyling.borderSize,
      boxSizing = _calculateNodeStyling.boxSizing,
      sizingStyle = _calculateNodeStyling.sizingStyle; // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content


  hiddenTextarea.setAttribute('style', "".concat(sizingStyle, ";").concat(HIDDEN_TEXTAREA_STYLE));
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || '';
  var minHeight = Number.MIN_SAFE_INTEGER;
  var maxHeight = Number.MAX_SAFE_INTEGER;
  var height = hiddenTextarea.scrollHeight;
  var overflowY;

  if (boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    height += borderSize;
  } else if (boxSizing === 'content-box') {
    // remove padding, since height = content
    height -= paddingSize;
  }

  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = ' ';
    var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;

      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize;
      }

      height = Math.max(minHeight, height);
    }

    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;

      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize;
      }

      overflowY = height > maxHeight ? '' : 'hidden';
      height = Math.min(maxHeight, height);
    }
  }

  return {
    height: height,
    minHeight: minHeight,
    maxHeight: maxHeight,
    overflowY: overflowY,
    resize: 'none'
  };
}

/***/ }),

/***/ "./node_modules/rc-textarea/es/index.js":
/*!**********************************************!*\
  !*** ./node_modules/rc-textarea/es/index.js ***!
  \**********************************************/
/*! exports provided: ResizableTextArea, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createSuper */ "./node_modules/@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ResizableTextArea__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ResizableTextArea */ "./node_modules/rc-textarea/es/ResizableTextArea.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResizableTextArea", function() { return _ResizableTextArea__WEBPACK_IMPORTED_MODULE_6__["default"]; });









var TextArea = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(TextArea, _React$Component);

  var _super = Object(_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__["default"])(TextArea);

  function TextArea(props) {
    var _this;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, TextArea);

    _this = _super.call(this, props);

    _this.focus = function () {
      _this.resizableTextArea.textArea.focus();
    };

    _this.saveTextArea = function (resizableTextArea) {
      _this.resizableTextArea = resizableTextArea;
    };

    _this.handleChange = function (e) {
      var onChange = _this.props.onChange;

      _this.setValue(e.target.value, function () {
        _this.resizableTextArea.resizeTextarea();
      });

      if (onChange) {
        onChange(e);
      }
    };

    _this.handleKeyDown = function (e) {
      var _this$props = _this.props,
          onPressEnter = _this$props.onPressEnter,
          onKeyDown = _this$props.onKeyDown;

      if (e.keyCode === 13 && onPressEnter) {
        onPressEnter(e);
      }

      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    var value = typeof props.value === 'undefined' || props.value === null ? props.defaultValue : props.value;
    _this.state = {
      value: value
    };
    return _this;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(TextArea, [{
    key: "setValue",
    value: function setValue(value, callback) {
      if (!('value' in this.props)) {
        this.setState({
          value: value
        }, callback);
      }
    }
  }, {
    key: "blur",
    value: function blur() {
      this.resizableTextArea.textArea.blur();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5__["createElement"](_ResizableTextArea__WEBPACK_IMPORTED_MODULE_6__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.props, {
        value: this.state.value,
        onKeyDown: this.handleKeyDown,
        onChange: this.handleChange,
        ref: this.saveTextArea
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      if ('value' in nextProps) {
        return {
          value: nextProps.value
        };
      }

      return null;
    }
  }]);

  return TextArea;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);


/* harmony default export */ __webpack_exports__["default"] = (TextArea);

/***/ })

}]);
//# sourceMappingURL=vendors~layouts__AppLayout~p__Audit~p__BigScreen~p__DeviceManage__Bay~p__DeviceManage__Dock~p__Devic~b54a16eb.js.map