"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFormCheckboxGroup;

var _react = require("react");

var _dotObject = _interopRequireDefault(require("dot-object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useFormCheckboxGroup(_ref) {
  var name = _ref.name,
      value = _ref.value,
      formData = _ref.values,
      setFormData = _ref.setValues;
  var formValue = _dotObject.default.pick(name, formData) || [];
  var hasValue = formValue.indexOf(value) > -1;

  var _useState = (0, _react.useState)(hasValue),
      _useState2 = _slicedToArray(_useState, 2),
      checked = _useState2[0],
      setChecked = _useState2[1]; // watch for external parent data changes


  (0, _react.useEffect)(function () {
    var isChecked = formValue.indexOf(value) > -1;
    setChecked(isChecked);
  }, [formValue, value]); // rewrite self and parent's value

  var handleChange = (0, _react.useCallback)(function (_ref2) {
    var target = _ref2.target;
    var oldValue = _dotObject.default.pick(name, formData) || [];
    var checked = target.checked;
    var newValue;
    var index = oldValue.indexOf(value);

    if (checked && index < 0) {
      newValue = [].concat(_toConsumableArray(oldValue), [value]);
    } else if (!checked && index > -1) {
      newValue = oldValue.filter(function (v) {
        return v !== value;
      });
    } // using dot helps us change nested values


    var data;
    var isNested = name.includes('.');

    if (isNested) {
      _dotObject.default.override = true;
      data = _dotObject.default.str(name, newValue, _objectSpread({}, formData));
    } else {
      data = _objectSpread({}, formData, _defineProperty({}, name, newValue));
    }

    setChecked(checked);
    setFormData(data);
  }, [value, formData, setFormData, name]);
  return {
    name: name,
    checked: checked,
    onChange: handleChange
  };
}

//# sourceMappingURL=useFormCheckboxGroup.js.map