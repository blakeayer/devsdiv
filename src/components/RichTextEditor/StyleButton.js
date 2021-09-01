import React from 'react';
// import Draft from 'draft-js';
import classes from './StyleButton.module.css';

const StyleButton = (props) => {
    const onToggle = event => {
        event.preventDefault();
        props.onToggle(props.style);
    };

    const styleButtonClasses = props.active 
        ? `${classes.styleButton} ${classes.activeButton}` 
        : `${classes.styleButton}`;
        
    return (
        <span 
            className={styleButtonClasses}
            onMouseDown={onToggle}
        >
            {props.label}
        </span>
    );
};

export default StyleButton;