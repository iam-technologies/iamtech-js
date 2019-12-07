import { useEffect, useState, useCallback } from 'react';

import useFormInput from './useFormInput';
// import useFormCheckboxGroup from './useFormCheckboxGroup';

export default function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [mounted, setMounted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showErrors, setShowErrors] = useState({});

  const handleError = useCallback(({ name, isValid, fieldErrors, showError }) => {
    // console.log("  - USEFORM: handleError -> isValid", isValid, '// errors: ',fieldErrors, '// showError', showError);

    const errors = {...formErrors};
    errors[name] = fieldErrors;
    setFormErrors(errors);

    const shouldShowErrors = {...showErrors};
    shouldShowErrors[name] = showError;
    setShowErrors(shouldShowErrors);

  }, [formErrors, showErrors]);

  useEffect(() => setMounted(true), []);

  const hasError = (errors) => Object.keys(errors).some(fieldErrors => errors[fieldErrors] && errors[fieldErrors].length > 0);

  const useInput = (name, validation) => useFormInput({
    name,
    validation,
    values,
    setValues,
    handleError
  });

  // const useCheckboxGroup = (name, value) => useFormCheckboxGroup({ name, values, setValues, value });

  // console.log("  - USEFORM: useForm -> formErrors: ", JSON.stringify(formErrors), '// hasError: ', JSON.stringify(hasError(formErrors)), '// showErrors: ', JSON.stringify(showErrors));
  return {
    values,
    setValues,
    useInput,
    showErrors,
    // useCheckboxGroup,
    errors: formErrors,
    isValid: mounted && !hasError(formErrors)
  };
}