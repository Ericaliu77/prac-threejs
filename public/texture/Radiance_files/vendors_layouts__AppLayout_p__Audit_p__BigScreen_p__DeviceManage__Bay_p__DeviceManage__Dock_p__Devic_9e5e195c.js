(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~layouts__AppLayout~p__Audit~p__BigScreen~p__DeviceManage__Bay~p__DeviceManage__Dock~p__Devic~9e5e195c"],{

/***/ "./node_modules/antd/es/typography/Base.js":
/*!*************************************************!*\
  !*** ./node_modules/antd/es/typography/Base.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createSuper */ "./node_modules/@babel/runtime/helpers/esm/createSuper.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var rc_util_es_Children_toArray__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rc-util/es/Children/toArray */ "./node_modules/rc-util/es/Children/toArray.js");
/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! copy-to-clipboard */ "./node_modules/copy-to-clipboard/index.js");
/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(copy_to_clipboard__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var rc_util_es_omit__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rc-util/es/omit */ "./node_modules/rc-util/es/omit.js");
/* harmony import */ var _ant_design_icons_es_icons_EditOutlined__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ant-design/icons/es/icons/EditOutlined */ "./node_modules/@ant-design/icons/es/icons/EditOutlined.js");
/* harmony import */ var _ant_design_icons_es_icons_CheckOutlined__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ant-design/icons/es/icons/CheckOutlined */ "./node_modules/@ant-design/icons/es/icons/CheckOutlined.js");
/* harmony import */ var _ant_design_icons_es_icons_CopyOutlined__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ant-design/icons/es/icons/CopyOutlined */ "./node_modules/@ant-design/icons/es/icons/CopyOutlined.js");
/* harmony import */ var rc_resize_observer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rc-resize-observer */ "./node_modules/rc-resize-observer/es/index.js");
/* harmony import */ var _config_provider__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../config-provider */ "./node_modules/antd/es/config-provider/index.js");
/* harmony import */ var _locale_provider_LocaleReceiver__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../locale-provider/LocaleReceiver */ "./node_modules/antd/es/locale-provider/LocaleReceiver.js");
/* harmony import */ var _util_devWarning__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../_util/devWarning */ "./node_modules/antd/es/_util/devWarning.js");
/* harmony import */ var _util_transButton__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../_util/transButton */ "./node_modules/antd/es/_util/transButton.js");
/* harmony import */ var _util_raf__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../_util/raf */ "./node_modules/antd/es/_util/raf.js");
/* harmony import */ var _util_styleChecker__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../_util/styleChecker */ "./node_modules/antd/es/_util/styleChecker.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../tooltip */ "./node_modules/antd/es/tooltip/index.js");
/* harmony import */ var _Typography__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Typography */ "./node_modules/antd/es/typography/Typography.js");
/* harmony import */ var _Editable__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./Editable */ "./node_modules/antd/es/typography/Editable.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./util */ "./node_modules/antd/es/typography/util.js");









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




















var isLineClampSupport = Object(_util_styleChecker__WEBPACK_IMPORTED_MODULE_22__["isStyleSupport"])('webkitLineClamp');
var isTextOverflowSupport = Object(_util_styleChecker__WEBPACK_IMPORTED_MODULE_22__["isStyleSupport"])('textOverflow');

function wrapperDecorations(_ref, content) {
  var mark = _ref.mark,
      code = _ref.code,
      underline = _ref.underline,
      del = _ref["delete"],
      strong = _ref.strong,
      keyboard = _ref.keyboard;
  var currentContent = content;

  function wrap(needed, tag) {
    if (!needed) return;
    currentContent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](tag, {}, currentContent);
  }

  wrap(strong, 'strong');
  wrap(underline, 'u');
  wrap(del, 'del');
  wrap(code, 'code');
  wrap(mark, 'mark');
  wrap(keyboard, 'kbd');
  return currentContent;
}

var ELLIPSIS_STR = '...';

var Base = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(Base, _React$Component);

  var _super = Object(_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_7__["default"])(Base);

  function Base() {
    var _this;

    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_4__["default"])(this, Base);

    _this = _super.apply(this, arguments);
    _this.contentRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createRef"]();
    _this.state = {
      edit: false,
      copied: false,
      ellipsisText: '',
      ellipsisContent: null,
      isEllipsis: false,
      expanded: false,
      clientRendered: false
    };

    _this.getPrefixCls = function () {
      var customizePrefixCls = _this.props.prefixCls;
      var getPrefixCls = _this.context.getPrefixCls;
      return getPrefixCls('typography', customizePrefixCls);
    }; // =============== Expand ===============


    _this.onExpandClick = function (e) {
      var _a;

      var _this$getEllipsis = _this.getEllipsis(),
          onExpand = _this$getEllipsis.onExpand;

      _this.setState({
        expanded: true
      });

      (_a = onExpand) === null || _a === void 0 ? void 0 : _a(e);
    }; // ================ Edit ================


    _this.onEditClick = function () {
      _this.triggerEdit(true);
    };

    _this.onEditChange = function (value) {
      var _this$getEditable = _this.getEditable(),
          onChange = _this$getEditable.onChange;

      onChange === null || onChange === void 0 ? void 0 : onChange(value);

      _this.triggerEdit(false);
    };

    _this.onEditCancel = function () {
      var _a, _b;

      (_b = (_a = _this.getEditable()).onCancel) === null || _b === void 0 ? void 0 : _b.call(_a);

      _this.triggerEdit(false);
    }; // ================ Copy ================


    _this.onCopyClick = function (e) {
      e.preventDefault();
      var _this$props = _this.props,
          children = _this$props.children,
          copyable = _this$props.copyable;

      var copyConfig = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({}, Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(copyable) === 'object' ? copyable : null);

      if (copyConfig.text === undefined) {
        copyConfig.text = String(children);
      }

      copy_to_clipboard__WEBPACK_IMPORTED_MODULE_11___default()(copyConfig.text || '');

      _this.setState({
        copied: true
      }, function () {
        if (copyConfig.onCopy) {
          copyConfig.onCopy();
        }

        _this.copyId = window.setTimeout(function () {
          _this.setState({
            copied: false
          });
        }, 3000);
      });
    };

    _this.setEditRef = function (node) {
      _this.editIcon = node;
    };

    _this.triggerEdit = function (edit) {
      var _this$getEditable2 = _this.getEditable(),
          onStart = _this$getEditable2.onStart;

      if (edit && onStart) {
        onStart();
      }

      _this.setState({
        edit: edit
      }, function () {
        if (!edit && _this.editIcon) {
          _this.editIcon.focus();
        }
      });
    }; // ============== Ellipsis ==============


    _this.resizeOnNextFrame = function () {
      _util_raf__WEBPACK_IMPORTED_MODULE_21__["default"].cancel(_this.rafId);
      _this.rafId = Object(_util_raf__WEBPACK_IMPORTED_MODULE_21__["default"])(function () {
        // Do not bind `syncEllipsis`. It need for test usage on prototype
        _this.syncEllipsis();
      });
    };

    return _this;
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_5__["default"])(Base, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        clientRendered: true
      });
      this.resizeOnNextFrame();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var children = this.props.children;
      var ellipsis = this.getEllipsis();
      var prevEllipsis = this.getEllipsis(prevProps);

      if (children !== prevProps.children || ellipsis.rows !== prevEllipsis.rows) {
        this.resizeOnNextFrame();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.clearTimeout(this.copyId);
      _util_raf__WEBPACK_IMPORTED_MODULE_21__["default"].cancel(this.rafId);
    }
  }, {
    key: "getEditable",
    value: function getEditable(props) {
      var edit = this.state.edit;

      var _ref2 = props || this.props,
          editable = _ref2.editable;

      if (!editable) return {
        editing: edit
      };
      return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({
        editing: edit
      }, Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(editable) === 'object' ? editable : null);
    }
  }, {
    key: "getEllipsis",
    value: function getEllipsis(props) {
      var _ref3 = props || this.props,
          ellipsis = _ref3.ellipsis;

      if (!ellipsis) return {};
      return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({
        rows: 1,
        expandable: false
      }, Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(ellipsis) === 'object' ? ellipsis : null);
    }
  }, {
    key: "canUseCSSEllipsis",
    value: function canUseCSSEllipsis() {
      var clientRendered = this.state.clientRendered;
      var _this$props2 = this.props,
          editable = _this$props2.editable,
          copyable = _this$props2.copyable;

      var _this$getEllipsis2 = this.getEllipsis(),
          rows = _this$getEllipsis2.rows,
          expandable = _this$getEllipsis2.expandable,
          suffix = _this$getEllipsis2.suffix,
          onEllipsis = _this$getEllipsis2.onEllipsis,
          tooltip = _this$getEllipsis2.tooltip;

      if (suffix || tooltip) return false; // Can't use css ellipsis since we need to provide the place for button

      if (editable || copyable || expandable || !clientRendered || onEllipsis) {
        return false;
      }

      if (rows === 1) {
        return isTextOverflowSupport;
      }

      return isLineClampSupport;
    }
  }, {
    key: "syncEllipsis",
    value: function syncEllipsis() {
      var _this$state = this.state,
          ellipsisText = _this$state.ellipsisText,
          isEllipsis = _this$state.isEllipsis,
          expanded = _this$state.expanded;

      var _this$getEllipsis3 = this.getEllipsis(),
          rows = _this$getEllipsis3.rows,
          suffix = _this$getEllipsis3.suffix,
          onEllipsis = _this$getEllipsis3.onEllipsis;

      var children = this.props.children;
      if (!rows || rows < 0 || !this.contentRef.current || expanded) return; // Do not measure if css already support ellipsis

      if (this.canUseCSSEllipsis()) return;
      Object(_util_devWarning__WEBPACK_IMPORTED_MODULE_19__["default"])(Object(rc_util_es_Children_toArray__WEBPACK_IMPORTED_MODULE_10__["default"])(children).every(function (child) {
        return typeof child === 'string';
      }), 'Typography', '`ellipsis` should use string as children only.');

      var _measure = Object(_util__WEBPACK_IMPORTED_MODULE_26__["default"])(this.contentRef.current, {
        rows: rows,
        suffix: suffix
      }, children, this.renderOperations(true), ELLIPSIS_STR),
          content = _measure.content,
          text = _measure.text,
          ellipsis = _measure.ellipsis;

      if (ellipsisText !== text || isEllipsis !== ellipsis) {
        this.setState({
          ellipsisText: text,
          ellipsisContent: content,
          isEllipsis: ellipsis
        });

        if (isEllipsis !== ellipsis && onEllipsis) {
          onEllipsis(ellipsis);
        }
      }
    }
  }, {
    key: "renderExpand",
    value: function renderExpand(forceRender) {
      var _this$getEllipsis4 = this.getEllipsis(),
          expandable = _this$getEllipsis4.expandable,
          symbol = _this$getEllipsis4.symbol;

      var _this$state2 = this.state,
          expanded = _this$state2.expanded,
          isEllipsis = _this$state2.isEllipsis;
      if (!expandable) return null; // force render expand icon for measure usage or it will cause dead loop

      if (!forceRender && (expanded || !isEllipsis)) return null;
      var expandContent;

      if (symbol) {
        expandContent = symbol;
      } else {
        expandContent = this.expandStr;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"]("a", {
        key: "expand",
        className: "".concat(this.getPrefixCls(), "-expand"),
        onClick: this.onExpandClick,
        "aria-label": this.expandStr
      }, expandContent);
    }
  }, {
    key: "renderEdit",
    value: function renderEdit() {
      var editable = this.props.editable;
      if (!editable) return;
      var icon = editable.icon,
          tooltip = editable.tooltip;
      var title = Object(rc_util_es_Children_toArray__WEBPACK_IMPORTED_MODULE_10__["default"])(tooltip)[0] || this.editStr;
      var ariaLabel = typeof title === 'string' ? title : '';
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_tooltip__WEBPACK_IMPORTED_MODULE_23__["default"], {
        key: "edit",
        title: tooltip === false ? '' : title
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_util_transButton__WEBPACK_IMPORTED_MODULE_20__["default"], {
        ref: this.setEditRef,
        className: "".concat(this.getPrefixCls(), "-edit"),
        onClick: this.onEditClick,
        "aria-label": ariaLabel
      }, icon || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_ant_design_icons_es_icons_EditOutlined__WEBPACK_IMPORTED_MODULE_13__["default"], {
        role: "button"
      })));
    }
  }, {
    key: "renderCopy",
    value: function renderCopy() {
      var copied = this.state.copied;
      var copyable = this.props.copyable;
      if (!copyable) return;
      var prefixCls = this.getPrefixCls();
      var tooltips = copyable.tooltips;
      var tooltipNodes = Object(rc_util_es_Children_toArray__WEBPACK_IMPORTED_MODULE_10__["default"])(tooltips);

      if (tooltipNodes.length === 0) {
        tooltipNodes = [this.copyStr, this.copiedStr];
      }

      var title = copied ? tooltipNodes[1] : tooltipNodes[0];
      var ariaLabel = typeof title === 'string' ? title : '';
      var icons = Object(rc_util_es_Children_toArray__WEBPACK_IMPORTED_MODULE_10__["default"])(copyable.icon);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_tooltip__WEBPACK_IMPORTED_MODULE_23__["default"], {
        key: "copy",
        title: tooltips === false ? '' : title
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_util_transButton__WEBPACK_IMPORTED_MODULE_20__["default"], {
        className: classnames__WEBPACK_IMPORTED_MODULE_9___default()("".concat(prefixCls, "-copy"), copied && "".concat(prefixCls, "-copy-success")),
        onClick: this.onCopyClick,
        "aria-label": ariaLabel
      }, copied ? icons[1] || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_ant_design_icons_es_icons_CheckOutlined__WEBPACK_IMPORTED_MODULE_14__["default"], null) : icons[0] || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_ant_design_icons_es_icons_CopyOutlined__WEBPACK_IMPORTED_MODULE_15__["default"], null)));
    }
  }, {
    key: "renderEditInput",
    value: function renderEditInput() {
      var _this$props3 = this.props,
          children = _this$props3.children,
          className = _this$props3.className,
          style = _this$props3.style;
      var direction = this.context.direction;

      var _this$getEditable3 = this.getEditable(),
          maxLength = _this$getEditable3.maxLength,
          autoSize = _this$getEditable3.autoSize,
          onEnd = _this$getEditable3.onEnd;

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_Editable__WEBPACK_IMPORTED_MODULE_25__["default"], {
        value: typeof children === 'string' ? children : '',
        onSave: this.onEditChange,
        onCancel: this.onEditCancel,
        onEnd: onEnd,
        prefixCls: this.getPrefixCls(),
        className: className,
        style: style,
        direction: direction,
        maxLength: maxLength,
        autoSize: autoSize
      });
    }
  }, {
    key: "renderOperations",
    value: function renderOperations(forceRenderExpanded) {
      return [this.renderExpand(forceRenderExpanded), this.renderEdit(), this.renderCopy()].filter(function (node) {
        return node;
      });
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this2 = this;

      var _this$state3 = this.state,
          ellipsisContent = _this$state3.ellipsisContent,
          isEllipsis = _this$state3.isEllipsis,
          expanded = _this$state3.expanded;

      var _a = this.props,
          component = _a.component,
          children = _a.children,
          className = _a.className,
          type = _a.type,
          disabled = _a.disabled,
          style = _a.style,
          restProps = __rest(_a, ["component", "children", "className", "type", "disabled", "style"]);

      var direction = this.context.direction;

      var _this$getEllipsis5 = this.getEllipsis(),
          rows = _this$getEllipsis5.rows,
          suffix = _this$getEllipsis5.suffix,
          tooltip = _this$getEllipsis5.tooltip;

      var prefixCls = this.getPrefixCls();
      var textProps = Object(rc_util_es_omit__WEBPACK_IMPORTED_MODULE_12__["default"])(restProps, ['prefixCls', 'editable', 'copyable', 'ellipsis', 'mark', 'code', 'delete', 'underline', 'strong', 'keyboard'].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_config_provider__WEBPACK_IMPORTED_MODULE_17__["configConsumerProps"])));
      var cssEllipsis = this.canUseCSSEllipsis();
      var cssTextOverflow = rows === 1 && cssEllipsis;
      var cssLineClamp = rows && rows > 1 && cssEllipsis;
      var textNode = children; // Only use js ellipsis when css ellipsis not support

      if (rows && isEllipsis && !expanded && !cssEllipsis) {
        var title = restProps.title;
        var restContent = title || '';

        if (!title && (typeof children === 'string' || typeof children === 'number')) {
          restContent = String(children);
        } // show rest content as title on symbol


        restContent = restContent === null || restContent === void 0 ? void 0 : restContent.slice(String(ellipsisContent || '').length); // We move full content to outer element to avoid repeat read the content by accessibility

        textNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](react__WEBPACK_IMPORTED_MODULE_8__["Fragment"], null, ellipsisContent, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"]("span", {
          title: restContent,
          "aria-hidden": "true"
        }, ELLIPSIS_STR), suffix); // If provided tooltip, we need wrap with span to let Tooltip inject events

        if (tooltip) {
          textNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_tooltip__WEBPACK_IMPORTED_MODULE_23__["default"], {
            title: tooltip === true ? children : tooltip
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"]("span", null, textNode));
        }
      } else {
        textNode = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](react__WEBPACK_IMPORTED_MODULE_8__["Fragment"], null, children, suffix);
      }

      textNode = wrapperDecorations(this.props, textNode);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_locale_provider_LocaleReceiver__WEBPACK_IMPORTED_MODULE_18__["default"], {
        componentName: "Text"
      }, function (_ref4) {
        var _classNames;

        var edit = _ref4.edit,
            copyStr = _ref4.copy,
            copied = _ref4.copied,
            expand = _ref4.expand;
        _this2.editStr = edit;
        _this2.copyStr = copyStr;
        _this2.copiedStr = copied;
        _this2.expandStr = expand;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](rc_resize_observer__WEBPACK_IMPORTED_MODULE_16__["default"], {
          onResize: _this2.resizeOnNextFrame,
          disabled: !rows
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_8__["createElement"](_Typography__WEBPACK_IMPORTED_MODULE_24__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({
          className: classnames__WEBPACK_IMPORTED_MODULE_9___default()((_classNames = {}, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames, "".concat(prefixCls, "-").concat(type), type), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames, "".concat(prefixCls, "-disabled"), disabled), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames, "".concat(prefixCls, "-ellipsis"), rows), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames, "".concat(prefixCls, "-ellipsis-single-line"), cssTextOverflow), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames, "".concat(prefixCls, "-ellipsis-multiple-line"), cssLineClamp), _classNames), className),
          style: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({}, style), {
            WebkitLineClamp: cssLineClamp ? rows : undefined
          }),
          component: component,
          ref: _this2.contentRef,
          direction: direction
        }, textProps), textNode, _this2.renderOperations()));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$getEditable4 = this.getEditable(),
          editing = _this$getEditable4.editing;

      if (editing) {
        return this.renderEditInput();
      }

      return this.renderContent();
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      var children = nextProps.children,
          editable = nextProps.editable;
      Object(_util_devWarning__WEBPACK_IMPORTED_MODULE_19__["default"])(!editable || typeof children === 'string', 'Typography', 'When `editable` is enabled, the `children` should use string.');
      return {};
    }
  }]);

  return Base;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);

Base.contextType = _config_provider__WEBPACK_IMPORTED_MODULE_17__["ConfigContext"];
Base.defaultProps = {
  children: ''
};
/* harmony default export */ __webpack_exports__["default"] = (Base);

/***/ }),

/***/ "./node_modules/antd/es/typography/Editable.js":
/*!*****************************************************!*\
  !*** ./node_modules/antd/es/typography/Editable.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rc_util_es_KeyCode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rc-util/es/KeyCode */ "./node_modules/rc-util/es/KeyCode.js");
/* harmony import */ var _ant_design_icons_es_icons_EnterOutlined__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ant-design/icons/es/icons/EnterOutlined */ "./node_modules/@ant-design/icons/es/icons/EnterOutlined.js");
/* harmony import */ var _input_TextArea__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../input/TextArea */ "./node_modules/antd/es/input/TextArea.js");








var Editable = function Editable(_ref) {
  var prefixCls = _ref.prefixCls,
      ariaLabel = _ref['aria-label'],
      className = _ref.className,
      style = _ref.style,
      direction = _ref.direction,
      maxLength = _ref.maxLength,
      _ref$autoSize = _ref.autoSize,
      autoSize = _ref$autoSize === void 0 ? true : _ref$autoSize,
      value = _ref.value,
      onSave = _ref.onSave,
      onCancel = _ref.onCancel,
      onEnd = _ref.onEnd;
  var ref = react__WEBPACK_IMPORTED_MODULE_2__["useRef"]();
  var inComposition = react__WEBPACK_IMPORTED_MODULE_2__["useRef"](false);
  var lastKeyCode = react__WEBPACK_IMPORTED_MODULE_2__["useRef"]();

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__["useState"](value),
      _React$useState2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState, 2),
      current = _React$useState2[0],
      setCurrent = _React$useState2[1];

  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    setCurrent(value);
  }, [value]);
  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    if (ref.current && ref.current.resizableTextArea) {
      var textArea = ref.current.resizableTextArea.textArea;
      textArea.focus();
      var length = textArea.value.length;
      textArea.setSelectionRange(length, length);
    }
  }, []);

  var onChange = function onChange(_ref2) {
    var target = _ref2.target;
    setCurrent(target.value.replace(/[\n\r]/g, ''));
  };

  var onCompositionStart = function onCompositionStart() {
    inComposition.current = true;
  };

  var onCompositionEnd = function onCompositionEnd() {
    inComposition.current = false;
  };

  var onKeyDown = function onKeyDown(_ref3) {
    var keyCode = _ref3.keyCode; // We don't record keyCode when IME is using

    if (inComposition.current) return;
    lastKeyCode.current = keyCode;
  };

  var confirmChange = function confirmChange() {
    onSave(current.trim());
  };

  var onKeyUp = function onKeyUp(_ref4) {
    var keyCode = _ref4.keyCode,
        ctrlKey = _ref4.ctrlKey,
        altKey = _ref4.altKey,
        metaKey = _ref4.metaKey,
        shiftKey = _ref4.shiftKey; // Check if it's a real key

    if (lastKeyCode.current === keyCode && !inComposition.current && !ctrlKey && !altKey && !metaKey && !shiftKey) {
      if (keyCode === rc_util_es_KeyCode__WEBPACK_IMPORTED_MODULE_4__["default"].ENTER) {
        confirmChange();
        onEnd === null || onEnd === void 0 ? void 0 : onEnd();
      } else if (keyCode === rc_util_es_KeyCode__WEBPACK_IMPORTED_MODULE_4__["default"].ESC) {
        onCancel();
      }
    }
  };

  var onBlur = function onBlur() {
    confirmChange();
  };

  var textAreaClassName = classnames__WEBPACK_IMPORTED_MODULE_3___default()(prefixCls, "".concat(prefixCls, "-edit-content"), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", {
    className: textAreaClassName,
    style: style
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_input_TextArea__WEBPACK_IMPORTED_MODULE_6__["default"], {
    ref: ref,
    maxLength: maxLength,
    value: current,
    onChange: onChange,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp,
    onCompositionStart: onCompositionStart,
    onCompositionEnd: onCompositionEnd,
    onBlur: onBlur,
    "aria-label": ariaLabel,
    autoSize: autoSize
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_ant_design_icons_es_icons_EnterOutlined__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "".concat(prefixCls, "-edit-content-confirm")
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Editable);

/***/ }),

/***/ "./node_modules/antd/es/typography/Link.js":
/*!*************************************************!*\
  !*** ./node_modules/antd/es/typography/Link.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_devWarning__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_util/devWarning */ "./node_modules/antd/es/_util/devWarning.js");
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Base */ "./node_modules/antd/es/typography/Base.js");



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





var Link = function Link(_a, ref) {
  var ellipsis = _a.ellipsis,
      rel = _a.rel,
      restProps = __rest(_a, ["ellipsis", "rel"]);

  Object(_util_devWarning__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(ellipsis) !== 'object', 'Typography.Link', '`ellipsis` only supports boolean value.');
  var baseRef = react__WEBPACK_IMPORTED_MODULE_2__["useRef"](null);
  react__WEBPACK_IMPORTED_MODULE_2__["useImperativeHandle"](ref, function () {
    var _a;

    return (_a = baseRef.current) === null || _a === void 0 ? void 0 : _a.contentRef.current;
  });

  var mergedProps = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, restProps), {
    rel: rel === undefined && restProps.target === '_blank' ? 'noopener noreferrer' : rel
  }); // https://github.com/ant-design/ant-design/issues/26622
  // @ts-ignore


  delete mergedProps.navigate;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_Base__WEBPACK_IMPORTED_MODULE_4__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, mergedProps, {
    ref: baseRef,
    ellipsis: !!ellipsis,
    component: "a"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](Link));

/***/ }),

/***/ "./node_modules/antd/es/typography/Paragraph.js":
/*!******************************************************!*\
  !*** ./node_modules/antd/es/typography/Paragraph.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Base */ "./node_modules/antd/es/typography/Base.js");




var Paragraph = function Paragraph(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Base__WEBPACK_IMPORTED_MODULE_2__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    component: "div"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Paragraph);

/***/ }),

/***/ "./node_modules/antd/es/typography/Text.js":
/*!*************************************************!*\
  !*** ./node_modules/antd/es/typography/Text.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rc_util_es_omit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rc-util/es/omit */ "./node_modules/rc-util/es/omit.js");
/* harmony import */ var _util_devWarning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_util/devWarning */ "./node_modules/antd/es/_util/devWarning.js");
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Base */ "./node_modules/antd/es/typography/Base.js");



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






var Text = function Text(_a) {
  var ellipsis = _a.ellipsis,
      restProps = __rest(_a, ["ellipsis"]);

  var mergedEllipsis = react__WEBPACK_IMPORTED_MODULE_2__["useMemo"](function () {
    if (ellipsis && Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(ellipsis) === 'object') {
      return Object(rc_util_es_omit__WEBPACK_IMPORTED_MODULE_3__["default"])(ellipsis, ['expandable', 'rows']);
    }

    return ellipsis;
  }, [ellipsis]);
  Object(_util_devWarning__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_1__["default"])(ellipsis) !== 'object' || !ellipsis || !('expandable' in ellipsis) && !('rows' in ellipsis), 'Typography.Text', '`ellipsis` do not support `expandable` or `rows` props.');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_Base__WEBPACK_IMPORTED_MODULE_5__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, restProps, {
    ellipsis: mergedEllipsis,
    component: "span"
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Text);

/***/ }),

/***/ "./node_modules/antd/es/typography/Title.js":
/*!**************************************************!*\
  !*** ./node_modules/antd/es/typography/Title.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_devWarning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_util/devWarning */ "./node_modules/antd/es/_util/devWarning.js");
/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Base */ "./node_modules/antd/es/typography/Base.js");
/* harmony import */ var _util_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_util/type */ "./node_modules/antd/es/_util/type.js");


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





var TITLE_ELE_LIST = Object(_util_type__WEBPACK_IMPORTED_MODULE_4__["tupleNum"])(1, 2, 3, 4, 5);

var Title = function Title(props) {
  var _props$level = props.level,
      level = _props$level === void 0 ? 1 : _props$level,
      restProps = __rest(props, ["level"]);

  var component;

  if (TITLE_ELE_LIST.indexOf(level) !== -1) {
    component = "h".concat(level);
  } else {
    Object(_util_devWarning__WEBPACK_IMPORTED_MODULE_2__["default"])(false, 'Typography.Title', 'Title only accept `1 | 2 | 3 | 4 | 5` as `level` value. And `5` need 4.6.0+ version.');
    component = 'h1';
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Base__WEBPACK_IMPORTED_MODULE_3__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, restProps, {
    component: component
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Title);

/***/ }),

/***/ "./node_modules/antd/es/typography/Typography.js":
/*!*******************************************************!*\
  !*** ./node_modules/antd/es/typography/Typography.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rc_util_es_ref__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rc-util/es/ref */ "./node_modules/rc-util/es/ref.js");
/* harmony import */ var _config_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config-provider */ "./node_modules/antd/es/config-provider/index.js");
/* harmony import */ var _util_devWarning__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_util/devWarning */ "./node_modules/antd/es/_util/devWarning.js");



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







var Typography = function Typography(_a, ref) {
  var customizePrefixCls = _a.prefixCls,
      _a$component = _a.component,
      component = _a$component === void 0 ? 'article' : _a$component,
      className = _a.className,
      ariaLabel = _a['aria-label'],
      setContentRef = _a.setContentRef,
      children = _a.children,
      restProps = __rest(_a, ["prefixCls", "component", "className", 'aria-label', "setContentRef", "children"]);

  var mergedRef = ref;

  if (setContentRef) {
    Object(_util_devWarning__WEBPACK_IMPORTED_MODULE_6__["default"])(false, 'Typography', '`setContentRef` is deprecated. Please use `ref` instead.');
    mergedRef = Object(rc_util_es_ref__WEBPACK_IMPORTED_MODULE_4__["composeRef"])(ref, setContentRef);
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_config_provider__WEBPACK_IMPORTED_MODULE_5__["ConfigConsumer"], null, function (_ref) {
    var getPrefixCls = _ref.getPrefixCls,
        direction = _ref.direction;
    var Component = component;
    var prefixCls = getPrefixCls('typography', customizePrefixCls);
    var componentClassName = classnames__WEBPACK_IMPORTED_MODULE_3___default()(prefixCls, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])({}, "".concat(prefixCls, "-rtl"), direction === 'rtl'), className);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      className: componentClassName,
      "aria-label": ariaLabel,
      ref: mergedRef
    }, restProps), children);
  });
};

var RefTypography = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](Typography);
RefTypography.displayName = 'Typography'; // es default export should use const instead of let

var ExportTypography = RefTypography;
/* harmony default export */ __webpack_exports__["default"] = (ExportTypography);

/***/ }),

/***/ "./node_modules/antd/es/typography/index.js":
/*!**************************************************!*\
  !*** ./node_modules/antd/es/typography/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Typography__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Typography */ "./node_modules/antd/es/typography/Typography.js");
/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Text */ "./node_modules/antd/es/typography/Text.js");
/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Link */ "./node_modules/antd/es/typography/Link.js");
/* harmony import */ var _Title__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Title */ "./node_modules/antd/es/typography/Title.js");
/* harmony import */ var _Paragraph__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Paragraph */ "./node_modules/antd/es/typography/Paragraph.js");





var Typography = _Typography__WEBPACK_IMPORTED_MODULE_0__["default"];
Typography.Text = _Text__WEBPACK_IMPORTED_MODULE_1__["default"];
Typography.Link = _Link__WEBPACK_IMPORTED_MODULE_2__["default"];
Typography.Title = _Title__WEBPACK_IMPORTED_MODULE_3__["default"];
Typography.Paragraph = _Paragraph__WEBPACK_IMPORTED_MODULE_4__["default"];
/* harmony default export */ __webpack_exports__["default"] = (Typography);

/***/ }),

/***/ "./node_modules/antd/es/typography/style/index.js":
/*!********************************************************!*\
  !*** ./node_modules/antd/es/typography/style/index.js ***!
  \********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../style/index.less */ "./node_modules/antd/es/style/index.less");
/* harmony import */ var _style_index_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_index_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.less */ "./node_modules/antd/es/typography/style/index.less");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tooltip_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tooltip/style */ "./node_modules/antd/es/tooltip/style/index.js");
/* harmony import */ var _input_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../input/style */ "./node_modules/antd/es/input/style/index.js");

 // style dependencies




/***/ }),

/***/ "./node_modules/antd/es/typography/style/index.less":
/*!**********************************************************!*\
  !*** ./node_modules/antd/es/typography/style/index.less ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1624783072440
      var cssReload = __webpack_require__(/*! ./node_modules/@umijs/bundler-webpack/lib/webpack/plugins/mini-css-extract-plugin/src/hmr/hotModuleReplacement.js */ "./node_modules/@umijs/bundler-webpack/lib/webpack/plugins/mini-css-extract-plugin/src/hmr/hotModuleReplacement.js")(module.i, {"publicPath":"./","hmr":true,"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/antd/es/typography/util.js":
/*!*************************************************!*\
  !*** ./node_modules/antd/es/typography/util.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rc_util_es_Children_toArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rc-util/es/Children/toArray */ "./node_modules/rc-util/es/Children/toArray.js");


 // We only handle element & text node.

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;
var ellipsisContainer;
var wrapperStyle = {
  padding: 0,
  margin: 0,
  display: 'inline',
  lineHeight: 'inherit'
};

function pxToNumber(value) {
  if (!value) return 0;
  var match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
}

function styleToString(style) {
  // There are some different behavior between Firefox & Chrome.
  // We have to handle this ourself.
  var styleNames = Array.prototype.slice.apply(style);
  return styleNames.map(function (name) {
    return "".concat(name, ": ").concat(style.getPropertyValue(name), ";");
  }).join('');
}

function mergeChildren(children) {
  var childList = [];
  children.forEach(function (child) {
    var prevChild = childList[childList.length - 1];

    if (typeof child === 'string' && typeof prevChild === 'string') {
      childList[childList.length - 1] += child;
    } else {
      childList.push(child);
    }
  });
  return childList;
}

/* harmony default export */ __webpack_exports__["default"] = (function (originEle, option, content, fixedContent, ellipsisStr) {
  if (!ellipsisContainer) {
    ellipsisContainer = document.createElement('div');
    ellipsisContainer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ellipsisContainer);
  }

  var rows = option.rows,
      _option$suffix = option.suffix,
      suffix = _option$suffix === void 0 ? '' : _option$suffix; // Get origin style

  var originStyle = window.getComputedStyle(originEle);
  var originCSS = styleToString(originStyle);
  var lineHeight = pxToNumber(originStyle.lineHeight);
  var maxHeight = Math.round(lineHeight * (rows + 1) + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom)); // Set shadow

  ellipsisContainer.setAttribute('style', originCSS);
  ellipsisContainer.style.position = 'fixed';
  ellipsisContainer.style.left = '0';
  ellipsisContainer.style.height = 'auto';
  ellipsisContainer.style.minHeight = 'auto';
  ellipsisContainer.style.maxHeight = 'auto';
  ellipsisContainer.style.top = '-999999px';
  ellipsisContainer.style.zIndex = '-1000'; // clean up css overflow

  ellipsisContainer.style.textOverflow = 'clip';
  ellipsisContainer.style.whiteSpace = 'normal';
  ellipsisContainer.style.webkitLineClamp = 'none'; // Render in the fake container

  var contentList = mergeChildren(Object(rc_util_es_Children_toArray__WEBPACK_IMPORTED_MODULE_2__["default"])(content));
  Object(react_dom__WEBPACK_IMPORTED_MODULE_0__["render"])( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    style: wrapperStyle
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", {
    style: wrapperStyle
  }, contentList, suffix), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", {
    style: wrapperStyle
  }, fixedContent)), ellipsisContainer); // wrap in an div for old version react
  // Check if ellipsis in measure div is height enough for content

  function inRange() {
    return ellipsisContainer.offsetHeight < maxHeight;
  } // Skip ellipsis if already match


  if (inRange()) {
    Object(react_dom__WEBPACK_IMPORTED_MODULE_0__["unmountComponentAtNode"])(ellipsisContainer);
    return {
      content: content,
      text: ellipsisContainer.innerHTML,
      ellipsis: false
    };
  } // We should clone the childNode since they're controlled by React and we can't reuse it without warning


  var childNodes = Array.prototype.slice.apply(ellipsisContainer.childNodes[0].childNodes[0].cloneNode(true).childNodes).filter(function (_ref) {
    var nodeType = _ref.nodeType;
    return nodeType !== COMMENT_NODE;
  });
  var fixedNodes = Array.prototype.slice.apply(ellipsisContainer.childNodes[0].childNodes[1].cloneNode(true).childNodes);
  Object(react_dom__WEBPACK_IMPORTED_MODULE_0__["unmountComponentAtNode"])(ellipsisContainer); // ========================= Find match ellipsis content =========================

  var ellipsisChildren = [];
  ellipsisContainer.innerHTML = ''; // Create origin content holder

  var ellipsisContentHolder = document.createElement('span');
  ellipsisContainer.appendChild(ellipsisContentHolder);
  var ellipsisTextNode = document.createTextNode(ellipsisStr + suffix);
  ellipsisContentHolder.appendChild(ellipsisTextNode);
  fixedNodes.forEach(function (childNode) {
    ellipsisContainer.appendChild(childNode);
  }); // Append before fixed nodes

  function appendChildNode(node) {
    ellipsisContentHolder.insertBefore(node, ellipsisTextNode);
  } // Get maximum text


  function measureText(textNode, fullText) {
    var startLoc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var endLoc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : fullText.length;
    var lastSuccessLoc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var midLoc = Math.floor((startLoc + endLoc) / 2);
    var currentText = fullText.slice(0, midLoc);
    textNode.textContent = currentText;

    if (startLoc >= endLoc - 1) {
      // Loop when step is small
      for (var step = endLoc; step >= startLoc; step -= 1) {
        var currentStepText = fullText.slice(0, step);
        textNode.textContent = currentStepText;

        if (inRange() || !currentStepText) {
          return step === fullText.length ? {
            finished: false,
            reactNode: fullText
          } : {
            finished: true,
            reactNode: currentStepText
          };
        }
      }
    }

    if (inRange()) {
      return measureText(textNode, fullText, midLoc, endLoc, midLoc);
    }

    return measureText(textNode, fullText, startLoc, midLoc, lastSuccessLoc);
  }

  function measureNode(childNode, index) {
    var type = childNode.nodeType;

    if (type === ELEMENT_NODE) {
      // We don't split element, it will keep if whole element can be displayed.
      appendChildNode(childNode);

      if (inRange()) {
        return {
          finished: false,
          reactNode: contentList[index]
        };
      } // Clean up if can not pull in


      ellipsisContentHolder.removeChild(childNode);
      return {
        finished: true,
        reactNode: null
      };
    }

    if (type === TEXT_NODE) {
      var fullText = childNode.textContent || '';
      var textNode = document.createTextNode(fullText);
      appendChildNode(textNode);
      return measureText(textNode, fullText);
    } // Not handle other type of content
    // PS: This code should not be attached after react 16

    /* istanbul ignore next */


    return {
      finished: false,
      reactNode: null
    };
  }

  childNodes.some(function (childNode, index) {
    var _measureNode = measureNode(childNode, index),
        finished = _measureNode.finished,
        reactNode = _measureNode.reactNode;

    if (reactNode) {
      ellipsisChildren.push(reactNode);
    }

    return finished;
  });
  return {
    content: ellipsisChildren,
    text: ellipsisContainer.innerHTML,
    ellipsis: true
  };
});

/***/ }),

/***/ "./node_modules/copy-to-clipboard/index.js":
/*!*************************************************!*\
  !*** ./node_modules/copy-to-clipboard/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deselectCurrent = __webpack_require__(/*! toggle-selection */ "./node_modules/toggle-selection/index.js");

var clipboardToIE11Formatting = {
  "text/plain": "Text",
  "text/html": "Url",
  "default": "Text"
};
var defaultMessage = "Copy to clipboard: #{key}, Enter";

function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function copy(text, options) {
  var debug,
      message,
      reselectPrevious,
      range,
      selection,
      mark,
      success = false;

  if (!options) {
    options = {};
  }

  debug = options.debug || false;

  try {
    reselectPrevious = deselectCurrent();
    range = document.createRange();
    selection = document.getSelection();
    mark = document.createElement("span");
    mark.textContent = text; // reset user styles for span element

    mark.style.all = "unset"; // prevents scrolling to the end of the page

    mark.style.position = "fixed";
    mark.style.top = 0;
    mark.style.clip = "rect(0, 0, 0, 0)"; // used to preserve spaces and line breaks

    mark.style.whiteSpace = "pre"; // do not inherit user-select (it may be `none`)

    mark.style.webkitUserSelect = "text";
    mark.style.MozUserSelect = "text";
    mark.style.msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function (e) {
      e.stopPropagation();

      if (options.format) {
        e.preventDefault();

        if (typeof e.clipboardData === "undefined") {
          // IE 11
          debug && console.warn("unable to use e.clipboardData");
          debug && console.warn("trying IE specific stuff");
          window.clipboardData.clearData();
          var format = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
          window.clipboardData.setData(format, text);
        } else {
          // all other browsers
          e.clipboardData.clearData();
          e.clipboardData.setData(options.format, text);
        }
      }

      if (options.onCopy) {
        e.preventDefault();
        options.onCopy(e.clipboardData);
      }
    });
    document.body.appendChild(mark);
    range.selectNodeContents(mark);
    selection.addRange(range);
    var successful = document.execCommand("copy");

    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }

    success = true;
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
    debug && console.warn("trying IE specific stuff");

    try {
      window.clipboardData.setData(options.format || "text", text);
      options.onCopy && options.onCopy(window.clipboardData);
      success = true;
    } catch (err) {
      debug && console.error("unable to copy using clipboardData: ", err);
      debug && console.error("falling back to prompt");
      message = format("message" in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }

    reselectPrevious();
  }

  return success;
}

module.exports = copy;

/***/ }),

/***/ "./node_modules/toggle-selection/index.js":
/*!************************************************!*\
  !*** ./node_modules/toggle-selection/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () {
  var selection = document.getSelection();

  if (!selection.rangeCount) {
    return function () {};
  }

  var active = document.activeElement;
  var ranges = [];

  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) {
    // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' && selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function (range) {
        selection.addRange(range);
      });
    }

    active && active.focus();
  };
};

/***/ })

}]);
//# sourceMappingURL=vendors~layouts__AppLayout~p__Audit~p__BigScreen~p__DeviceManage__Bay~p__DeviceManage__Dock~p__Devic~9e5e195c.js.map