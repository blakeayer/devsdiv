import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.css';

const Navbar = () => {
    return (
        <div className={classes.center}>
            <p className={classes.boards}>Boards: </p>
            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink 
                            activeClassName={classes.active} 
                            to='/r'
                        >
                            react
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            activeClassName={classes.active} 
                            to='/js'
                        >
                            javascript
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            activeClassName={classes.active} 
                            to='/py'
                        >
                            python
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;