"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validate;

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Returns either unmet rule, or null
 * @param value
 * @param validation
 * @returns {*}
 */
function validate(value, validation) {
  var fields = [];
  var trimmedValidation;
  var validatingFields;

  switch (_typeof(validation)) {
    case 'object':
      Object.keys(validation).forEach(function (property) {
        fields.push({
          rule: property,
          options: validation[property]
        });
      });
      break;

    case 'string':
    default:
      if (!validation.length) return true;
      trimmedValidation = validation.replace(/ /g, '');
      validatingFields = trimmedValidation.split(',');
      validatingFields.forEach(function (fieldName) {
        fields.push({
          rule: fieldName
        });
      });
  }

  var isValid = true;
  var errors = [];
  fields.forEach(function (field) {
    var rule = field.rule,
        _field$options = field.options,
        options = _field$options === void 0 ? null : _field$options;

    switch (rule.trim()) {
      case 'isRequired':
        if (!value) {
          isValid = false;
          errors.push(rule);
        }

        break;

      default:
        if (isValid) {
          var result;

          if (options !== null) {
            switch (options) {
              case true:
                result = _validator.default[rule](value);
                break;

              case false:
                result = !_validator.default[rule](value);
                break;

              default:
                result = _validator.default[rule](value, options);
            }
          } else {
            result = _validator.default[rule](value);
          }

          ;
          isValid = result;
          if (!result) errors.push(rule);
          break;
        }

    }
  });
  return {
    isValid: isValid,
    errors: errors
  };
}

;

//# sourceMappingURL=validator.js.map