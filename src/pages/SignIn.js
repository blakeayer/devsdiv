import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { useAuth } from '../store/AuthContext' 

import Card from '../components/UI/Card';
import classes from './SignIn.module.css';


const SignIn = () => {
    const { login } = useAuth();
    const history = useHistory();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {

    // }, []);

    // Input validation from { useInput } custom hook
    const passwordValidation = (value) => value.trim() !== '';
    const emailValidation = (value) => value.includes('@');
    
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

    // Form validation (checks if all inputs are truthy)
    let formIsValid = false;
    
    if(
        enteredEmailIsValid && 
        enteredPasswordIsValid 
    ) {
        formIsValid = true;
    }

    // Event handler
    const formSubmissionHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true)

        try {
            await login(enteredEmail, enteredPassword)
            setIsLoading(false);
            resetEmailInput();
            resetPasswordInput();
            history.replace('/');
        } catch {
            setError('Failed to sign in.')
            alert(error);
        }

    };

    // Dynamic styling depending on input validation
    const emailInputClasses = emailInputHasError 
        ? `${classes.formControl} ${classes.invalid}` 
        : `${classes.formControl}`;
    const passwordInputClasses = passwordInputHasError 
        ? `${classes.formControl} ${classes.invalid}` 
        : `${classes.formControl}`;

    // JSX element
    return (
        <Card className={classes.container}>
            <div className={classes.center}>
                <form onSubmit={formSubmissionHandler}>
                    <div className={classes.formControls}>
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
                                        Password required.
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
                                Sign In
                            </button>
                    </div>

                </form>
            </div>

        </Card>
    );
};

export default SignIn;