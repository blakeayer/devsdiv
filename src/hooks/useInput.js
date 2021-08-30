import { useState } from 'react';

const useInput = (validation) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [enteredTouched, setIsTouched] = useState(false);

    const valueIsValid = validation(enteredValue);
    const hasError = !valueIsValid && enteredTouched;

    const valueChangeHandler = event => {
        setEnteredValue(event.target.value);
        // console.log(Date.now());
    };

    const inputBlurHandler = () => {
        setIsTouched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError: hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
};

export default useInput;