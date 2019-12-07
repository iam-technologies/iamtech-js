import validator from 'validator';

/**
 * Returns either unmet rule, or null
 * @param value
 * @param validation
 * @returns {*}
 */
export default function validate(value, validation) {
  const fields = [];

  let trimmedValidation;
  let validatingFields;

  switch (typeof validation) {
    case 'object':
      Object.keys(validation).forEach((property) => {
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
      validatingFields.forEach((fieldName) => {
        fields.push({
          rule: fieldName
        });
      });
  }

  let isValid = true;
  const errors = [];

  fields.forEach((field) => {
    const { rule, options = null } = field;

    switch (rule.trim()) {
      case 'isRequired':
        if (!value) {
          isValid = false;
          errors.push(rule)
        }
        break;
      default:
        if (isValid) {
          let result;
          if (options !== null) {
            switch (options) {
              case true:
                result = validator[rule](value);
                break;
              case false:
                result = !validator[rule](value);
                break;
              default:
                result = validator[rule](value, options);
            }
          } else {
            result = validator[rule](value)
          };
          isValid = result;
          if (!result) errors.push(rule);
          break;
        }
    }
  });
  return { isValid, errors };
};
