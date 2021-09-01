import React, { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../store/AuthContext';
import classes from './UserProfile.module.css';

const UserProfile = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const changePasswordInputRef = useRef();
    const authCtx = useContext(AuthContext);

    const submitHandler = event => {
        event.preventDefault();
        setIsLoading(true);
        const enteredChangePassword = changePasswordInputRef.current.value;
        // add validation

        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:update?key=process.env.REACT_APP_FIREBASE_API_KEY', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCtx.token,
                    password: enteredChangePassword,
                    returnSecureToken: false
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => {
            setIsLoading(false);
            if (res.ok) {
                // ....
            } else {
                return res.json().then(data => {
                    let errorMessage = 'Authentication failed!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    // style nice modal for error message
                    alert(errorMessage);
                });
            }
            history.replace('/');
        });
    };

    return (
        <section className={classes.profile}>
            <h1>User Profile</h1>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='changePassword'>Change Password: </label>
                    <input type='password' id='changePassword' ref={changePasswordInputRef} />
                </div>
                {isLoading && <div className={classes.loading}>Sending request...</div>}
                <div className={classes.action}>
                    <button>Change Password</button>
                </div>
            </form>
        </section>
    );
};

export default UserProfile;