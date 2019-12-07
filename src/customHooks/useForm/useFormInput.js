import { useEffect, useState, useCallback } from 'react';
import dot from 'dot-object';

import validate from './validator';

export default function useFormInput({
  name,
  validation = '',
  values: formData,
  setValues: setFormData,
  handleError
}) {
  const formValue = dot.pick(name, formData) || '';

  const [value, setValue] = useState(formValue);
  const [isTouched, setIsTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [validationRules] = useState(validation);

  const handleValidation = useCallback(() => {
    // console.log("    - FORMINPUT: handleValidation",)
    const { isValid, errors } = validate(value, validationRules);
    const showError = !isValid && isTouched && !isFocused;
    handleError({ name, isValid, fieldErrors: errors, showError });
  }, [validationRules, name, value, /*handleError,*/ isTouched, isFocused]);

  // watch for external parent data changes
  useEffect(() => {
    // console.log("    - FORMINPUT: watch for external parent data changes: value: ",value, '// formValue: ', formValue, '// compare: ',value !== formValue)
    if (value !== formValue) {
      setValue(formValue);
      setIsTouched(false);
      setIsFocused(false);
    }
  }, [formValue, value, setValue, setIsFocused, setIsTouched]);

  // validate on value change
  useEffect(() => {
    // console.log("    - FORMINPUT: validate on value change",)
    handleValidation();
  }, [handleValidation, name]);

  // rewrite self and parent's value
  const handleChange = useCallback(({ target }) => {
    const { value, checked, type } = target;
    const newValue = type === 'checkbox' ? checked : value;
    // console.log("    - FORMINPUT: handleChange. name: ", name, '// newValue: ', newValue);

    // using dot helps us change nested values
    let data;
    const isNested = name.includes('.');
    if (isNested) {
      dot.override = true;
      data = dot.str(name, newValue, { ...formData });
    } else data = { ...formData, [name]: newValue };

    setValue(newValue);
    setFormData(data);
  }, [setValue, formData, setFormData, name]);

  const handleFocus = useCallback(() => {
    // console.log("    - FORMINPUT: handleFocus");
    setIsTouched(true);
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => { 
    // console.log("    - FORMINPUT: handleBlur", +(new Date()));
    setIsFocused(false); 
  }, []);

  return {
    value,
    name,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur
  };
}