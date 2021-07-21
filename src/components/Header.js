import React from 'react';
import { ReactComponent as Logo } from './logo.svg';
import classes from './Header.module.css';

const Header = () => {
    return (
        <header>
            <div className={classes.box}>
                <Logo className={classes.logo} />
                <span><h2>Company Name</h2></span> {/*align left (next to logo)*/}
            </div>
            <div className={classes.box}>
                <input value="Username"></input>
                <input value="Password"></input>
                <button>Sign In</button>
                <a className={classes.link}>Register</a>
            </div>
        </header>
    );
};


export default Header;