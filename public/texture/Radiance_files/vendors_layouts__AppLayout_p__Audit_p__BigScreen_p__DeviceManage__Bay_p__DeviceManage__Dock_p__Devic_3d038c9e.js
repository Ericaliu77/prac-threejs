(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendors~layouts__AppLayout~p__Audit~p__BigScreen~p__DeviceManage__Bay~p__DeviceManage__Dock~p__Devic~3d038c9e"],{

/***/ "./node_modules/antd/es/_util/hooks/usePatchElement.js":
/*!*************************************************************!*\
  !*** ./node_modules/antd/es/_util/hooks/usePatchElement.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return usePatchElement; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



function usePatchElement() {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__["useState"]([]),
      _React$useState2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState, 2),
      elements = _React$useState2[0],
      setElements = _React$useState2[1];

  var patchElement = react__WEBPACK_IMPORTED_MODULE_2__["useCallback"](function (element) {
    // append a new element to elements (and create a new ref)
    setElements(function (originElements) {
      return [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(originElements), [element]);
    }); // return a function that removes the new element out of elements (and create a new ref)
    // it works a little like useEffect

    return function () {
      setElements(function (originElements) {
        return originElements.filter(function (ele) {
          return ele !== element;
        });
      });
    };
  }, []);
  return [elements, patchElement];
}

/***/ }),

/***/ "./node_modules/antd/es/modal/ActionButton.js":
/*!****************************************************!*\
  !*** ./node_modules/antd/es/modal/ActionButton.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../button */ "./node_modules/antd/es/button/index.js");
/* harmony import */ var _button_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../button/button */ "./node_modules/antd/es/button/button.js");






var ActionButton = function ActionButton(props) {
  var clickedRef = react__WEBPACK_IMPORTED_MODULE_2__["useRef"](false);
  var ref = react__WEBPACK_IMPORTED_MODULE_2__["useRef"]();

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__["useState"](false),
      _React$useState2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState, 2),
      loading = _React$useState2[0],
      setLoading = _React$useState2[1];

  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    var timeoutId;

    if (props.autoFocus) {
      var $this = ref.current;
      timeoutId = setTimeout(function () {
        return $this.focus();
      });
    }

    return function () {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  var handlePromiseOnOk = function handlePromiseOnOk(returnValueOfOnOk) {
    var closeModal = props.closeModal;

    if (!returnValueOfOnOk || !returnValueOfOnOk.then) {
      return;
    }

    setLoading(true);
    returnValueOfOnOk.then(function () {
      // It's unnecessary to set loading=false, for the Modal will be unmounted after close.
      // setState({ loading: false });
      closeModal.apply(void 0, arguments);
    }, function (e) {
      // Emit error when catch promise reject
      // eslint-disable-next-line no-console
      console.error(e); // See: https://github.com/ant-design/ant-design/issues/6183

      setLoading(false);
      clickedRef.current = false;
    });
  };

  var onClick = function onClick() {
    var actionFn = props.actionFn,
        closeModal = props.closeModal;

    if (clickedRef.current) {
      return;
    }

    clickedRef.current = true;

    if (!actionFn) {
      closeModal();
      return;
    }

    var returnValueOfOnOk;

    if (actionFn.length) {
      returnValueOfOnOk = actionFn(closeModal); // https://github.com/ant-design/ant-design/issues/23358

      clickedRef.current = false;
    } else {
      returnValueOfOnOk = actionFn();

      if (!returnValueOfOnOk) {
        closeModal();
        return;
      }
    }

    handlePromiseOnOk(returnValueOfOnOk);
  };

  var type = props.type,
      children = props.children,
      prefixCls = props.prefixCls,
      buttonProps = props.buttonProps;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_button__WEBPACK_IMPORTED_MODULE_3__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, Object(_button_button__WEBPACK_IMPORTED_MODULE_4__["convertLegacyProps"])(type), {
    onClick: onClick,
    loading: loading,
    prefixCls: prefixCls
  }, buttonProps, {
    ref: ref
  }), children);
};

/* harmony default export */ __webpack_exports__["default"] = (ActionButton);

/***/ }),

/***/ "./node_modules/antd/es/modal/ConfirmDialog.js":
/*!*****************************************************!*\
  !*** ./node_modules/antd/es/modal/ConfirmDialog.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Modal */ "./node_modules/antd/es/modal/Modal.js");
/* harmony import */ var _ActionButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ActionButton */ "./node_modules/antd/es/modal/ActionButton.js");
/* harmony import */ var _util_devWarning__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_util/devWarning */ "./node_modules/antd/es/_util/devWarning.js");
/* harmony import */ var _config_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config-provider */ "./node_modules/antd/es/config-provider/index.js");
/* harmony import */ var _util_motion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_util/motion */ "./node_modules/antd/es/_util/motion.js");









var ConfirmDialog = function ConfirmDialog(props) {
  var icon = props.icon,
      onCancel = props.onCancel,
      onOk = props.onOk,
      close = props.close,
      zIndex = props.zIndex,
      afterClose = props.afterClose,
      visible = props.visible,
      keyboard = props.keyboard,
      centered = props.centered,
      getContainer = props.getContainer,
      maskStyle = props.maskStyle,
      okText = props.okText,
      okButtonProps = props.okButtonProps,
      cancelText = props.cancelText,
      cancelButtonProps = props.cancelButtonProps,
      direction = props.direction,
      prefixCls = props.prefixCls,
      rootPrefixCls = props.rootPrefixCls,
      bodyStyle = props.bodyStyle,
      _props$closable = props.closable,
      closable = _props$closable === void 0 ? false : _props$closable,
      closeIcon = props.closeIcon,
      modalRender = props.modalRender,
      focusTriggerAfterClose = props.focusTriggerAfterClose;
  Object(_util_devWarning__WEBPACK_IMPORTED_MODULE_5__["default"])(!(typeof icon === 'string' && icon.length > 2), 'Modal', "`icon` is using ReactNode instead of string naming in v4. Please check `".concat(icon, "` at https://ant.design/components/icon")); // 支持传入{ icon: null }来隐藏`Modal.confirm`默认的Icon

  var okType = props.okType || 'primary';
  var contentPrefixCls = "".concat(prefixCls, "-confirm"); // 默认为 true，保持向下兼容

  var okCancel = 'okCancel' in props ? props.okCancel : true;
  var width = props.width || 416;
  var style = props.style || {};
  var mask = props.mask === undefined ? true : props.mask; // 默认为 false，保持旧版默认行为

  var maskClosable = props.maskClosable === undefined ? false : props.maskClosable;
  var autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || 'ok';
  var classString = classnames__WEBPACK_IMPORTED_MODULE_2___default()(contentPrefixCls, "".concat(contentPrefixCls, "-").concat(props.type), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, "".concat(contentPrefixCls, "-rtl"), direction === 'rtl'), props.className);
  var cancelButton = okCancel && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ActionButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
    actionFn: onCancel,
    closeModal: close,
    autoFocus: autoFocusButton === 'cancel',
    buttonProps: cancelButtonProps,
    prefixCls: "".concat(rootPrefixCls, "-btn")
  }, cancelText);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_Modal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    prefixCls: prefixCls,
    className: classString,
    wrapClassName: classnames__WEBPACK_IMPORTED_MODULE_2___default()(Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, "".concat(contentPrefixCls, "-centered"), !!props.centered)),
    onCancel: function onCancel() {
      return close({
        triggerCancel: true
      });
    },
    visible: visible,
    title: "",
    footer: "",
    transitionName: Object(_util_motion__WEBPACK_IMPORTED_MODULE_7__["getTransitionName"])(rootPrefixCls, 'zoom', props.transitionName),
    maskTransitionName: Object(_util_motion__WEBPACK_IMPORTED_MODULE_7__["getTransitionName"])(rootPrefixCls, 'fade', props.maskTransitionName),
    mask: mask,
    maskClosable: maskClosable,
    maskStyle: maskStyle,
    style: style,
    width: width,
    zIndex: zIndex,
    afterClose: afterClose,
    keyboard: keyboard,
    centered: centered,
    getContainer: getContainer,
    closable: closable,
    closeIcon: closeIcon,
    modalRender: modalRender,
    focusTriggerAfterClose: focusTriggerAfterClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    className: "".concat(contentPrefixCls, "-body-wrapper")
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_config_provider__WEBPACK_IMPORTED_MODULE_6__["default"], {
    prefixCls: rootPrefixCls
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    className: "".concat(contentPrefixCls, "-body"),
    style: bodyStyle
  }, icon, props.title === undefined ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", {
    className: "".concat(contentPrefixCls, "-title")
  }, props.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    className: "".concat(contentPrefixCls, "-content")
  }, props.content))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
    className: "".concat(contentPrefixCls, "-btns")
  }, cancelButton, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ActionButton__WEBPACK_IMPORTED_MODULE_4__["default"], {
    type: okType,
    actionFn: onOk,
    closeModal: close,
    autoFocus: autoFocusButton === 'ok',
    buttonProps: okButtonProps,
    prefixCls: "".concat(rootPrefixCls, "-btn")
  }, okText))));
};

/* harmony default export */ __webpack_exports__["default"] = (ConfirmDialog);

/***/ }),

/***/ "./node_modules/antd/es/modal/Modal.js":
/*!*********************************************!*\
  !*** ./node_modules/antd/es/modal/Modal.js ***!
  \*********************************************/
/*! exports provided: destroyFns, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroyFns", function() { return destroyFns; });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rc_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rc-dialog */ "./node_modules/rc-dialog/es/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ant_design_icons_es_icons_CloseOutlined__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ant-design/icons/es/icons/CloseOutlined */ "./node_modules/@ant-design/icons/es/icons/CloseOutlined.js");
/* harmony import */ var _useModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useModal */ "./node_modules/antd/es/modal/useModal/index.js");
/* harmony import */ var _locale__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./locale */ "./node_modules/antd/es/modal/locale.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../button */ "./node_modules/antd/es/button/index.js");
/* harmony import */ var _button_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../button/button */ "./node_modules/antd/es/button/button.js");
/* harmony import */ var _locale_provider_LocaleReceiver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../locale-provider/LocaleReceiver */ "./node_modules/antd/es/locale-provider/LocaleReceiver.js");
/* harmony import */ var _config_provider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../config-provider */ "./node_modules/antd/es/config-provider/index.js");
/* harmony import */ var _util_styleChecker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../_util/styleChecker */ "./node_modules/antd/es/_util/styleChecker.js");
/* harmony import */ var _util_motion__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../_util/motion */ "./node_modules/antd/es/_util/motion.js");



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













var mousePosition;
var destroyFns = []; // ref: https://github.com/ant-design/ant-design/issues/15795

var getClickPosition = function getClickPosition(e) {
  mousePosition = {
    x: e.pageX,
    y: e.pageY
  }; // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开

  setTimeout(function () {
    mousePosition = null;
  }, 100);
}; // 只有点击事件支持从鼠标位置动画展开


if (Object(_util_styleChecker__WEBPACK_IMPORTED_MODULE_12__["canUseDocElement"])()) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}

var Modal = function Modal(props) {
  var _classNames;

  var _React$useContext = react__WEBPACK_IMPORTED_MODULE_2__["useContext"](_config_provider__WEBPACK_IMPORTED_MODULE_11__["ConfigContext"]),
      getContextPopupContainer = _React$useContext.getPopupContainer,
      getPrefixCls = _React$useContext.getPrefixCls,
      direction = _React$useContext.direction;

  var handleCancel = function handleCancel(e) {
    var onCancel = props.onCancel;
    onCancel === null || onCancel === void 0 ? void 0 : onCancel(e);
  };

  var handleOk = function handleOk(e) {
    var onOk = props.onOk;
    onOk === null || onOk === void 0 ? void 0 : onOk(e);
  };

  var renderFooter = function renderFooter(locale) {
    var okText = props.okText,
        okType = props.okType,
        cancelText = props.cancelText,
        confirmLoading = props.confirmLoading;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_button__WEBPACK_IMPORTED_MODULE_8__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      onClick: handleCancel
    }, props.cancelButtonProps), cancelText || locale.cancelText), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_button__WEBPACK_IMPORTED_MODULE_8__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, Object(_button_button__WEBPACK_IMPORTED_MODULE_9__["convertLegacyProps"])(okType), {
      loading: confirmLoading,
      onClick: handleOk
    }, props.okButtonProps), okText || locale.okText));
  };

  var customizePrefixCls = props.prefixCls,
      footer = props.footer,
      visible = props.visible,
      wrapClassName = props.wrapClassName,
      centered = props.centered,
      getContainer = props.getContainer,
      closeIcon = props.closeIcon,
      _props$focusTriggerAf = props.focusTriggerAfterClose,
      focusTriggerAfterClose = _props$focusTriggerAf === void 0 ? true : _props$focusTriggerAf,
      restProps = __rest(props, ["prefixCls", "footer", "visible", "wrapClassName", "centered", "getContainer", "closeIcon", "focusTriggerAfterClose"]);

  var prefixCls = getPrefixCls('modal', customizePrefixCls);
  var rootPrefixCls = getPrefixCls();
  var defaultFooter = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_locale_provider_LocaleReceiver__WEBPACK_IMPORTED_MODULE_10__["default"], {
    componentName: "Modal",
    defaultLocale: Object(_locale__WEBPACK_IMPORTED_MODULE_7__["getConfirmLocale"])()
  }, renderFooter);
  var closeIconToRender = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("span", {
    className: "".concat(prefixCls, "-close-x")
  }, closeIcon || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_ant_design_icons_es_icons_CloseOutlined__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "".concat(prefixCls, "-close-icon")
  }));
  var wrapClassNameExtended = classnames__WEBPACK_IMPORTED_MODULE_4___default()(wrapClassName, (_classNames = {}, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames, "".concat(prefixCls, "-centered"), !!centered), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_classNames, "".concat(prefixCls, "-wrap-rtl"), direction === 'rtl'), _classNames));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](rc_dialog__WEBPACK_IMPORTED_MODULE_3__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, restProps, {
    getContainer: getContainer === undefined ? getContextPopupContainer : getContainer,
    prefixCls: prefixCls,
    wrapClassName: wrapClassNameExtended,
    footer: footer === undefined ? defaultFooter : footer,
    visible: visible,
    mousePosition: mousePosition,
    onClose: handleCancel,
    closeIcon: closeIconToRender,
    focusTriggerAfterClose: focusTriggerAfterClose,
    transitionName: Object(_util_motion__WEBPACK_IMPORTED_MODULE_13__["getTransitionName"])(rootPrefixCls, 'zoom', props.transitionName),
    maskTransitionName: Object(_util_motion__WEBPACK_IMPORTED_MODULE_13__["getTransitionName"])(rootPrefixCls, 'fade', props.maskTransitionName)
  }));
};

Modal.useModal = _useModal__WEBPACK_IMPORTED_MODULE_6__["default"];
Modal.defaultProps = {
  width: 520,
  confirmLoading: false,
  visible: false,
  okType: 'primary'
};
/* harmony default export */ __webpack_exports__["default"] = (Modal);

/***/ }),

/***/ "./node_modules/antd/es/modal/confirm.js":
/*!***********************************************!*\
  !*** ./node_modules/antd/es/modal/confirm.js ***!
  \***********************************************/
/*! exports provided: default, withWarn, withInfo, withSuccess, withError, withConfirm, modalGlobalConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return confirm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withWarn", function() { return withWarn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withInfo", function() { return withInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withSuccess", function() { return withSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withError", function() { return withError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withConfirm", function() { return withConfirm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modalGlobalConfig", function() { return modalGlobalConfig; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons_es_icons_InfoCircleOutlined__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons/es/icons/InfoCircleOutlined */ "./node_modules/@ant-design/icons/es/icons/InfoCircleOutlined.js");
/* harmony import */ var _ant_design_icons_es_icons_CheckCircleOutlined__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ant-design/icons/es/icons/CheckCircleOutlined */ "./node_modules/@ant-design/icons/es/icons/CheckCircleOutlined.js");
/* harmony import */ var _ant_design_icons_es_icons_CloseCircleOutlined__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ant-design/icons/es/icons/CloseCircleOutlined */ "./node_modules/@ant-design/icons/es/icons/CloseCircleOutlined.js");
/* harmony import */ var _ant_design_icons_es_icons_ExclamationCircleOutlined__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ant-design/icons/es/icons/ExclamationCircleOutlined */ "./node_modules/@ant-design/icons/es/icons/ExclamationCircleOutlined.js");
/* harmony import */ var _locale__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./locale */ "./node_modules/antd/es/modal/locale.js");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Modal */ "./node_modules/antd/es/modal/Modal.js");
/* harmony import */ var _ConfirmDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ConfirmDialog */ "./node_modules/antd/es/modal/ConfirmDialog.js");
/* harmony import */ var _config_provider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../config-provider */ "./node_modules/antd/es/config-provider/index.js");
/* harmony import */ var _util_devWarning__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../_util/devWarning */ "./node_modules/antd/es/_util/devWarning.js");


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












var defaultRootPrefixCls = '';

function getRootPrefixCls() {
  return defaultRootPrefixCls;
}

function confirm(config) {
  var div = document.createElement('div');
  document.body.appendChild(div); // eslint-disable-next-line @typescript-eslint/no-use-before-define

  var currentConfig = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, config), {
    close: close,
    visible: true
  });

  function destroy() {
    var unmountResult = react_dom__WEBPACK_IMPORTED_MODULE_2__["unmountComponentAtNode"](div);

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var triggerCancel = args.some(function (param) {
      return param && param.triggerCancel;
    });

    if (config.onCancel && triggerCancel) {
      config.onCancel.apply(config, args);
    }

    for (var i = 0; i < _Modal__WEBPACK_IMPORTED_MODULE_8__["destroyFns"].length; i++) {
      var fn = _Modal__WEBPACK_IMPORTED_MODULE_8__["destroyFns"][i]; // eslint-disable-next-line @typescript-eslint/no-use-before-define

      if (fn === close) {
        _Modal__WEBPACK_IMPORTED_MODULE_8__["destroyFns"].splice(i, 1);
        break;
      }
    }
  }

  function render(_a) {
    var okText = _a.okText,
        cancelText = _a.cancelText,
        customizePrefixCls = _a.prefixCls,
        props = __rest(_a, ["okText", "cancelText", "prefixCls"]);
    /**
     * https://github.com/ant-design/ant-design/issues/23623
     *
     * Sync render blocks React event. Let's make this async.
     */


    setTimeout(function () {
      var runtimeLocale = Object(_locale__WEBPACK_IMPORTED_MODULE_7__["getConfirmLocale"])();

      var _globalConfig = Object(_config_provider__WEBPACK_IMPORTED_MODULE_10__["globalConfig"])(),
          getPrefixCls = _globalConfig.getPrefixCls; // because Modal.config  set rootPrefixCls, which is different from other components


      var rootPrefixCls = getPrefixCls(undefined, getRootPrefixCls());
      var prefixCls = customizePrefixCls || "".concat(rootPrefixCls, "-modal");
      react_dom__WEBPACK_IMPORTED_MODULE_2__["render"]( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ConfirmDialog__WEBPACK_IMPORTED_MODULE_9__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
        prefixCls: prefixCls,
        rootPrefixCls: rootPrefixCls,
        okText: okText || (props.okCancel ? runtimeLocale.okText : runtimeLocale.justOkText),
        cancelText: cancelText || runtimeLocale.cancelText
      })), div);
    });
  }

  function close() {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    currentConfig = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, currentConfig), {
      visible: false,
      afterClose: function afterClose() {
        if (typeof config.afterClose === 'function') {
          config.afterClose();
        }

        destroy.apply(_this, args);
      }
    });
    render(currentConfig);
  }

  function update(configUpdate) {
    if (typeof configUpdate === 'function') {
      currentConfig = configUpdate(currentConfig);
    } else {
      currentConfig = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, currentConfig), configUpdate);
    }

    render(currentConfig);
  }

  render(currentConfig);
  _Modal__WEBPACK_IMPORTED_MODULE_8__["destroyFns"].push(close);
  return {
    destroy: close,
    update: update
  };
}
function withWarn(props) {
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ant_design_icons_es_icons_ExclamationCircleOutlined__WEBPACK_IMPORTED_MODULE_6__["default"], null),
    okCancel: false
  }, props), {
    type: 'warning'
  });
}
function withInfo(props) {
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ant_design_icons_es_icons_InfoCircleOutlined__WEBPACK_IMPORTED_MODULE_3__["default"], null),
    okCancel: false
  }, props), {
    type: 'info'
  });
}
function withSuccess(props) {
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ant_design_icons_es_icons_CheckCircleOutlined__WEBPACK_IMPORTED_MODULE_4__["default"], null),
    okCancel: false
  }, props), {
    type: 'success'
  });
}
function withError(props) {
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ant_design_icons_es_icons_CloseCircleOutlined__WEBPACK_IMPORTED_MODULE_5__["default"], null),
    okCancel: false
  }, props), {
    type: 'error'
  });
}
function withConfirm(props) {
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_ant_design_icons_es_icons_ExclamationCircleOutlined__WEBPACK_IMPORTED_MODULE_6__["default"], null),
    okCancel: true
  }, props), {
    type: 'confirm'
  });
}
function modalGlobalConfig(_ref) {
  var rootPrefixCls = _ref.rootPrefixCls;
  Object(_util_devWarning__WEBPACK_IMPORTED_MODULE_11__["default"])(false, 'Modal', 'Modal.config is deprecated. Please use ConfigProvider.config instead.');
  defaultRootPrefixCls = rootPrefixCls;
}

/***/ }),

/***/ "./node_modules/antd/es/modal/index.js":
/*!*********************************************!*\
  !*** ./node_modules/antd/es/modal/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal */ "./node_modules/antd/es/modal/Modal.js");
/* harmony import */ var _confirm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./confirm */ "./node_modules/antd/es/modal/confirm.js");



function modalWarn(props) {
  return Object(_confirm__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_confirm__WEBPACK_IMPORTED_MODULE_1__["withWarn"])(props));
}

var Modal = _Modal__WEBPACK_IMPORTED_MODULE_0__["default"];

Modal.info = function infoFn(props) {
  return Object(_confirm__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_confirm__WEBPACK_IMPORTED_MODULE_1__["withInfo"])(props));
};

Modal.success = function successFn(props) {
  return Object(_confirm__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_confirm__WEBPACK_IMPORTED_MODULE_1__["withSuccess"])(props));
};

Modal.error = function errorFn(props) {
  return Object(_confirm__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_confirm__WEBPACK_IMPORTED_MODULE_1__["withError"])(props));
};

Modal.warning = modalWarn;
Modal.warn = modalWarn;

Modal.confirm = function confirmFn(props) {
  return Object(_confirm__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_confirm__WEBPACK_IMPORTED_MODULE_1__["withConfirm"])(props));
};

Modal.destroyAll = function destroyAllFn() {
  while (_Modal__WEBPACK_IMPORTED_MODULE_0__["destroyFns"].length) {
    var close = _Modal__WEBPACK_IMPORTED_MODULE_0__["destroyFns"].pop();

    if (close) {
      close();
    }
  }
};

Modal.config = _confirm__WEBPACK_IMPORTED_MODULE_1__["modalGlobalConfig"];
/* harmony default export */ __webpack_exports__["default"] = (Modal);

/***/ }),

/***/ "./node_modules/antd/es/modal/style/index.js":
/*!***************************************************!*\
  !*** ./node_modules/antd/es/modal/style/index.js ***!
  \***************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../style/index.less */ "./node_modules/antd/es/style/index.less");
/* harmony import */ var _style_index_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_index_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.less */ "./node_modules/antd/es/modal/style/index.less");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _button_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../button/style */ "./node_modules/antd/es/button/style/index.js");

 // style dependencies



/***/ }),

/***/ "./node_modules/antd/es/modal/style/index.less":
/*!*****************************************************!*\
  !*** ./node_modules/antd/es/modal/style/index.less ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(true) {
      // 1624783065580
      var cssReload = __webpack_require__(/*! ./node_modules/@umijs/bundler-webpack/lib/webpack/plugins/mini-css-extract-plugin/src/hmr/hotModuleReplacement.js */ "./node_modules/@umijs/bundler-webpack/lib/webpack/plugins/mini-css-extract-plugin/src/hmr/hotModuleReplacement.js")(module.i, {"publicPath":"./","hmr":true,"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/antd/es/modal/useModal/HookModal.js":
/*!**********************************************************!*\
  !*** ./node_modules/antd/es/modal/useModal/HookModal.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ConfirmDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ConfirmDialog */ "./node_modules/antd/es/modal/ConfirmDialog.js");
/* harmony import */ var _locale_default__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../locale/default */ "./node_modules/antd/es/locale/default.js");
/* harmony import */ var _locale_provider_LocaleReceiver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../locale-provider/LocaleReceiver */ "./node_modules/antd/es/locale-provider/LocaleReceiver.js");
/* harmony import */ var _config_provider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../config-provider */ "./node_modules/antd/es/config-provider/index.js");








var HookModal = function HookModal(_ref, ref) {
  var afterClose = _ref.afterClose,
      config = _ref.config;

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__["useState"](true),
      _React$useState2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_2__["useState"](config),
      _React$useState4 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState3, 2),
      innerConfig = _React$useState4[0],
      setInnerConfig = _React$useState4[1];

  var _React$useContext = react__WEBPACK_IMPORTED_MODULE_2__["useContext"](_config_provider__WEBPACK_IMPORTED_MODULE_6__["ConfigContext"]),
      direction = _React$useContext.direction,
      getPrefixCls = _React$useContext.getPrefixCls;

  var prefixCls = getPrefixCls('modal');
  var rootPrefixCls = getPrefixCls();

  function close() {
    setVisible(false);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var triggerCancel = args.some(function (param) {
      return param && param.triggerCancel;
    });

    if (innerConfig.onCancel && triggerCancel) {
      innerConfig.onCancel();
    }
  }

  react__WEBPACK_IMPORTED_MODULE_2__["useImperativeHandle"](ref, function () {
    return {
      destroy: close,
      update: function update(newConfig) {
        setInnerConfig(function (originConfig) {
          return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, originConfig), newConfig);
        });
      }
    };
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_locale_provider_LocaleReceiver__WEBPACK_IMPORTED_MODULE_5__["default"], {
    componentName: "Modal",
    defaultLocale: _locale_default__WEBPACK_IMPORTED_MODULE_4__["default"].Modal
  }, function (modalLocale) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_ConfirmDialog__WEBPACK_IMPORTED_MODULE_3__["default"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      prefixCls: prefixCls,
      rootPrefixCls: rootPrefixCls
    }, innerConfig, {
      close: close,
      visible: visible,
      afterClose: afterClose,
      okText: innerConfig.okText || (innerConfig.okCancel ? modalLocale.okText : modalLocale.justOkText),
      direction: direction,
      cancelText: innerConfig.cancelText || modalLocale.cancelText
    }));
  });
};

/* harmony default export */ __webpack_exports__["default"] = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](HookModal));

/***/ }),

/***/ "./node_modules/antd/es/modal/useModal/index.js":
/*!******************************************************!*\
  !*** ./node_modules/antd/es/modal/useModal/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useModal; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_hooks_usePatchElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_util/hooks/usePatchElement */ "./node_modules/antd/es/_util/hooks/usePatchElement.js");
/* harmony import */ var _HookModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HookModal */ "./node_modules/antd/es/modal/useModal/HookModal.js");
/* harmony import */ var _confirm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../confirm */ "./node_modules/antd/es/modal/confirm.js");






var uuid = 0;
var ElementsHolder = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["memo"]( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function (_props, ref) {
  var _usePatchElement = Object(_util_hooks_usePatchElement__WEBPACK_IMPORTED_MODULE_3__["default"])(),
      _usePatchElement2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_usePatchElement, 2),
      elements = _usePatchElement2[0],
      patchElement = _usePatchElement2[1];

  react__WEBPACK_IMPORTED_MODULE_2__["useImperativeHandle"](ref, function () {
    return {
      patchElement: patchElement
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, elements);
}));
function useModal() {
  var holderRef = react__WEBPACK_IMPORTED_MODULE_2__["useRef"](null); // ========================== Effect ==========================

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2__["useState"]([]),
      _React$useState2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_React$useState, 2),
      actionQueue = _React$useState2[0],
      setActionQueue = _React$useState2[1];

  react__WEBPACK_IMPORTED_MODULE_2__["useEffect"](function () {
    if (actionQueue.length) {
      var cloneQueue = Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(actionQueue);

      cloneQueue.forEach(function (action) {
        action();
      });
      setActionQueue([]);
    }
  }, [actionQueue]); // =========================== Hook ===========================

  var getConfirmFunc = react__WEBPACK_IMPORTED_MODULE_2__["useCallback"](function (withFunc) {
    return function hookConfirm(config) {
      var _a;

      uuid += 1;
      var modalRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createRef"]();
      var closeFunc;
      var modal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_HookModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
        key: "modal-".concat(uuid),
        config: withFunc(config),
        ref: modalRef,
        afterClose: function afterClose() {
          closeFunc();
        }
      });
      closeFunc = (_a = holderRef.current) === null || _a === void 0 ? void 0 : _a.patchElement(modal);
      return {
        destroy: function destroy() {
          function destroyAction() {
            var _a;

            (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.destroy();
          }

          if (modalRef.current) {
            destroyAction();
          } else {
            setActionQueue(function (prev) {
              return [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(prev), [destroyAction]);
            });
          }
        },
        update: function update(newConfig) {
          function updateAction() {
            var _a;

            (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.update(newConfig);
          }

          if (modalRef.current) {
            updateAction();
          } else {
            setActionQueue(function (prev) {
              return [].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(prev), [updateAction]);
            });
          }
        }
      };
    };
  }, []);
  var fns = react__WEBPACK_IMPORTED_MODULE_2__["useMemo"](function () {
    return {
      info: getConfirmFunc(_confirm__WEBPACK_IMPORTED_MODULE_5__["withInfo"]),
      success: getConfirmFunc(_confirm__WEBPACK_IMPORTED_MODULE_5__["withSuccess"]),
      error: getConfirmFunc(_confirm__WEBPACK_IMPORTED_MODULE_5__["withError"]),
      warning: getConfirmFunc(_confirm__WEBPACK_IMPORTED_MODULE_5__["withWarn"]),
      confirm: getConfirmFunc(_confirm__WEBPACK_IMPORTED_MODULE_5__["withConfirm"])
    };
  }, []); // eslint-disable-next-line react/jsx-key

  return [fns, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](ElementsHolder, {
    ref: holderRef
  })];
}

/***/ })

}]);
//# sourceMappingURL=vendors~layouts__AppLayout~p__Audit~p__BigScreen~p__DeviceManage__Bay~p__DeviceManage__Dock~p__Devic~3d038c9e.js.map