import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = (props) => {

    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const logout = () => {
        return auth.signOut();
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setIsLoading(false);
        })
        return unsubscribe;
    }, [setCurrentUser, setIsLoading])

    const value = {
        currentUser,
        login,
        logout,
        signup
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!isLoading && props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;