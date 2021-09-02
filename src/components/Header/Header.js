import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../store/AuthContext' 
import { ReactComponent as Logo } from './logo.svg';
import Navbar from '../Navbar/Navbar';
import classes from './Header.module.css';

const Header = () => {
    const { currentUser, logout } = useAuth();

    return (
        <div className={classes.mainHeader}>
            <header>
                
                <div className={classes.container}>
                    <div className={classes.logo}>
                        <Logo className={classes.logo} />
                    </div>
                    <div className={classes['top-padding']}>
                        <Link  to='/home' className={classes.link}><h2>&lt;DevsDiv /&gt;</h2></Link>
                    </div>
                </div>
                
                <nav>
                    {!currentUser && (
                        <ul className={classes.header}>
                            <li>
                                <Link 
                                    to="/signin" 
                                    className={classes.link} 
                                >
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/register" 
                                    className={classes.link}
                                >
                                    Register
                                </Link>
                            </li>
                        </ul>
                    )}
                    {currentUser && (
                        <ul className={classes.header}>
                            <li>
                                <Link   
                                    to="/home" 
                                    className={classes.link} 
                                    onClick={logout}
                                >
                                    Logout
                                </Link>
                            </li>
                            {/* <li>
                                <Link 
                                    to="/profile" 
                                    className={classes.link}
                                >
                                    Profile
                                </Link>
                            </li> */}
                        </ul>
                    )}
                </nav>

            </header>
            <Navbar />
        </div>
    );
};

export default Header;