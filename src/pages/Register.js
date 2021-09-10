import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../store/AuthContext' 
import useInput from '../hooks/useInput';

import Card from '../components/UI/Card';
import classes from './Register.module.css';

const Register = () => {

    const { signup, login } = useAuth();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // INPUT VALIDATION
    const notEmptyValidation = (value) => value.trim() !== '';
    const emailValidation = (value) => value.includes('@');
    const passwordValidation = (value) => (value.trim().length > 5);
    const requiredAge = 21;
    const birthDateValidation = (value) => (
        Date.parse(value) <= (Date.now() - (requiredAge * 31557600000))
    );    
    
    // USEINPUT HOOK
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid, 
        hasError: firstNameInputHasError, 
        valueChangeHandler: firstNameChangeHandler, 
        inputBlurHandler: firstNameBlurHandler,
        reset: resetFirstNameInput
    } = useInput(notEmptyValidation);
    
    const {
        value: enteredLastName,
        isValid: enteredLastNameIsValid, 
        hasError: lastNameInputHasError, 
        valueChangeHandler: lastNameChangeHandler, 
        inputBlurHandler: lastNameBlurHandler,
        reset: resetLastNameInput
    } = useInput(notEmptyValidation);
    
    const {
        value: enteredBirthDate,
        isValid: enteredBirthDateIsValid, 
        hasError: birthDateInputHasError, 
        valueChangeHandler: birthDateChangeHandler, 
        inputBlurHandler: birthDateBlurHandler,
        reset: resetBirthDateInput
    } = useInput(birthDateValidation);
    
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid, 
        hasError: emailInputHasError, 
        valueChangeHandler: emailChangeHandler, 
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput(emailValidation);
    
    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid, 
        hasError: passwordInputHasError, 
        valueChangeHandler: passwordChangeHandler, 
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
    } = useInput(passwordValidation);

    // FORM VALIDATION
    let formIsValid = false;
    if(
        enteredFirstNameIsValid && 
        enteredLastNameIsValid &&
        enteredEmailIsValid &&
        enteredPasswordIsValid
    ) {
        formIsValid = true;
    }
    
    const formSubmissionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if(
            !enteredFirstNameIsValid || 
            !enteredLastNameIsValid || 
            !enteredEmailIsValid || 
            !enteredBirthDateIsValid ||
            !enteredPasswordIsValid
        ) {
            return;
        }

        try {
            await signup(enteredEmail, enteredPassword)
            try {
                await login(enteredEmail, enteredPassword)
                setIsLoading(false);
                resetFirstNameInput();
                resetLastNameInput();
                resetEmailInput();
                resetBirthDateInput();
                resetPasswordInput();
                history.replace('/');
            } catch {
                setError('Unable to log in.')
                alert(error);
            }
        } catch {
            setError('Failed to create account.')
            alert(error);
        }

    };
    
    const firstNameInputClasses = firstNameInputHasError 
        ? `${classes.formControl} ${classes.invalid}` 
        : `${classes.formControl}`;
    const lastNameInputClasses = lastNameInputHasError 
        ? `${classes.formControl} ${classes.invalid}` 
        : `${classes.formControl}`;
    const birthDateInputClasses = birthDateInputHasError 
        ? `${classes.formControl} ${classes.invalid}` 
        : `${classes.formControl}`;
    const emailInputClasses = emailInputHasError 
        ? `${classes.formControl} ${classes.invalid}` 
        : `${classes.formControl}`;
    const passwordInputClasses = passwordInputHasError 
        ? `${classes.formControl} ${classes.invalid}` 
        : `${classes.formControl}`;

    return (
        <Card className={classes.registerationForm}>
            <div className={classes.center}>
                <form onSubmit={formSubmissionHandler} >

                    <div className={classes.formControls}>
                        
                        <div className={firstNameInputClasses}>
                            <label htmlFor='firstname'>First Name: </label>
                            <input 
                                type='text' 
                                id='firstname' 
                                onChange={firstNameChangeHandler}
                                onBlur={firstNameBlurHandler}
                                value={enteredFirstName}
                            />
                            {firstNameInputHasError && (
                                <span className={classes.errorText}>
                                    Required field.
                                </span>
                            )}
                        </div>

                        <div className={lastNameInputClasses}>
                            <label htmlFor='lastname' >Last Name: </label>
                            <input 
                                type='text' 
                                id='lastname'
                                onChange={lastNameChangeHandler}
                                onBlur={lastNameBlurHandler}
                                value={enteredLastName}
                            />
                            {lastNameInputHasError && (
                                <span className={classes.errorText}>
                                    Required field.
                                </span>
                            )}
                        </div>

                        <div className={birthDateInputClasses}>
                            <label>Date of Birth: </label>
                            <input 
                                type='date'
                                id='dob'
                                onChange={birthDateChangeHandler}
                                onBlur={birthDateBlurHandler}
                                value={enteredBirthDate}
                            />
                            {birthDateInputHasError && (
                                <span className={classes.errorText}>
                                    Enter a valid DOB (must be at least {requiredAge}).
                                </span>
                            )}
                        </div>

                        <div className={emailInputClasses}>
                            <label>Email: </label>
                            <input 
                                type='text'
                                id='email'
                                onChange={emailChangeHandler}
                                onBlur={emailBlurHandler}
                                value={enteredEmail}    
                            />
                            {emailInputHasError && (
                                <span className={classes.errorText}>
                                    Please enter a valid email.
                                </span>
                            )}
                        </div>
                        
                        <div className={passwordInputClasses}>
                            <label>Password: </label>
                            <input 
                                type='password'
                                id='password'
                                onChange={passwordChangeHandler}
                                onBlur={passwordBlurHandler}
                                value={enteredPassword}    
                            />
                            {passwordInputHasError && (
                                <span className={classes.errorText}>
                                    Must be at least 6 characters.
                                </span>
                            )}
                        </div>

                    </div>
                    {isLoading && <div className={classes.loading}>Sending request...</div>}
                    <div className={classes.formActions}>
                        <label></label>
                        <button
                            type="submit" 
                            disabled={!formIsValid}
                        >
                            Register
                        </button>
                    </div>

                </form>
            </div>        
        </Card>
    );
};

export default Register;