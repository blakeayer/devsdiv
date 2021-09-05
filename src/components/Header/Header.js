import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../store/AuthContext' 
import { ReactComponent as Logo } from './logo.svg';
import Navbar from '../Navbar/Navbar';
import classes from './Header.module.css';

const Header = () => {
    const { currentUser, logout } = useAuth();

    return (
            <header>
                <div className={classes['main-header']}>
                    <div className={classes.container}>
                        <Logo className={classes.logo} />
                        <Link  to='/home' className={classes.link}><h2>&lt;DevsDiv /&gt;</h2></Link>
                    </div>
                    <nav>
                        {!currentUser && (
                            <ul className={classes.header}>
                                <li>
                                    <Link to="/signin" className={classes.link}>
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register" className={classes.link}>
                                        Register
                                    </Link>
                                </li>
                            </ul>
                        )}
                        {currentUser && (
                            <ul className={classes.header}>
                                <li>
                                    <Link to="/home" className={classes.link} onClick={logout}>
                                        Logout
                                    </Link>
                                </li>
                            {/* <li>
                                    <Link to="/profile" className={classes.link}>
                                        Profile
                                    </Link>
                                </li> */}
                            </ul>
                        )}
                    </nav>
                </div>
                <Navbar />
            </header>
    );
};

export default Header;