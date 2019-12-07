"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFormInput;

var _react = require("react");

var _dotObject = _interopRequireDefault(require("dot-object"));

var _validator = _interopRequireDefault(require("./validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useFormInput(_ref) {
  var name = _ref.name,
      _ref$validation = _ref.validation,
      validation = _ref$validation === void 0 ? '' : _ref$validation,
      formData = _ref.values,
      setFormData = _ref.setValues,
      handleError = _ref.handleError;
  var formValue = _dotObject.default.pick(name, formData) || '';

  var _useState = (0, _react.useState)(formValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isTouched = _useState4[0],
      setIsTouched = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isFocused = _useState6[0],
      setIsFocused = _useState6[1];

  var _useState7 = (0, _react.useState)(validation),
      _useState8 = _slicedToArray(_useState7, 1),
      validationRules = _useState8[0];

  var handleValidation = (0, _react.useCallback)(function () {
    // console.log("    - FORMINPUT: handleValidation",)
    var _validate = (0, _validator.default)(value, validationRules),
        isValid = _validate.isValid,
        errors = _validate.errors;

    var showError = !isValid && isTouched && !isFocused;
    handleError({
      name: name,
      isValid: isValid,
      fieldErrors: errors,
      showError: showError
    });
  }, [validationRules, name, value,
  /*handleError,*/
  isTouched, isFocused]); // watch for external parent data changes

  (0, _react.useEffect)(function () {
    // console.log("    - FORMINPUT: watch for external parent data changes: value: ",value, '// formValue: ', formValue, '// compare: ',value !== formValue)
    if (value !== formValue) {
      setValue(formValue);
      setIsTouched(false);
      setIsFocused(false);
    }
  }, [formValue, value, setValue, setIsFocused, setIsTouched]); // validate on value change

  (0, _react.useEffect)(function () {
    // console.log("    - FORMINPUT: validate on value change",)
    handleValidation();
  }, [handleValidation, name]); // rewrite self and parent's value

  var handleChange = (0, _react.useCallback)(function (_ref2) {
    var target = _ref2.target;
    var value = target.value,
        checked = target.checked,
        type = target.type;
    var newValue = type === 'checkbox' ? checked : value; // console.log("    - FORMINPUT: handleChange. name: ", name, '// newValue: ', newValue);
    // using dot helps us change nested values

    var data;
    var isNested = name.includes('.');

    if (isNested) {
      _dotObject.default.override = true;
      data = _dotObject.default.str(name, newValue, _objectSpread({}, formData));
    } else data = _objectSpread({}, formData, _defineProperty({}, name, newValue));

    setValue(newValue);
    setFormData(data);
  }, [setValue, formData, setFormData, name]);
  var handleFocus = (0, _react.useCallback)(function () {
    // console.log("    - FORMINPUT: handleFocus");
    setIsTouched(true);
    setIsFocused(true);
  }, []);
  var handleBlur = (0, _react.useCallback)(function () {
    // console.log("    - FORMINPUT: handleBlur", +(new Date()));
    setIsFocused(false);
  }, []);
  return {
    value: value,
    name: name,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur
  };
}

//# sourceMappingURL=useFormInput.js.map