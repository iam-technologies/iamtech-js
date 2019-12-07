"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useForm;

var _react = require("react");

var _useFormInput = _interopRequireDefault(require("./useFormInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// import useFormCheckboxGroup from './useFormCheckboxGroup';
function useForm(defaultValues) {
  var _useState = (0, _react.useState)(defaultValues),
      _useState2 = _slicedToArray(_useState, 2),
      values = _useState2[0],
      setValues = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      mounted = _useState4[0],
      setMounted = _useState4[1];

  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      formErrors = _useState6[0],
      setFormErrors = _useState6[1];

  var _useState7 = (0, _react.useState)({}),
      _useState8 = _slicedToArray(_useState7, 2),
      showErrors = _useState8[0],
      setShowErrors = _useState8[1];

  var handleError = (0, _react.useCallback)(function (_ref) {
    var name = _ref.name,
        isValid = _ref.isValid,
        fieldErrors = _ref.fieldErrors,
        showError = _ref.showError;

    // console.log("  - USEFORM: handleError -> isValid", isValid, '// errors: ',fieldErrors, '// showError', showError);
    var errors = _objectSpread({}, formErrors);

    errors[name] = fieldErrors;
    setFormErrors(errors);

    var shouldShowErrors = _objectSpread({}, showErrors);

    shouldShowErrors[name] = showError;
    setShowErrors(shouldShowErrors);
  }, [formErrors, showErrors]);
  (0, _react.useEffect)(function () {
    return setMounted(true);
  }, []);

  var hasError = function hasError(errors) {
    return Object.keys(errors).some(function (fieldErrors) {
      return errors[fieldErrors] && errors[fieldErrors].length > 0;
    });
  };

  var useInput = function useInput(name, validation) {
    return (0, _useFormInput.default)({
      name: name,
      validation: validation,
      values: values,
      setValues: setValues,
      handleError: handleError
    });
  }; // const useCheckboxGroup = (name, value) => useFormCheckboxGroup({ name, values, setValues, value });
  // console.log("  - USEFORM: useForm -> formErrors: ", JSON.stringify(formErrors), '// hasError: ', JSON.stringify(hasError(formErrors)), '// showErrors: ', JSON.stringify(showErrors));


  return {
    values: values,
    setValues: setValues,
    useInput: useInput,
    showErrors: showErrors,
    // useCheckboxGroup,
    errors: formErrors,
    isValid: mounted && !hasError(formErrors)
  };
}

//# sourceMappingURL=useForm.js.map