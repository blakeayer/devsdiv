import React from 'react';
import StyleButton from './StyleButton';

import classes from './InlineStyleControls.module.css';



var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD', icon: 'B' },
    { label: 'Italic', style: 'ITALIC', icon: 'I' },
    { label: 'Underline', style: 'UNDERLINE', icon: 'U' },
    { label: 'Monospace', style: 'CODE', icon: '{ }' },
];

const InlineStyleControls = (props) => {
    const inlineStyleState = props.editorState.getCurrentInlineStyle();
    return (
        <div className={classes.controls}>
            {INLINE_STYLES.map(type => (
                <StyleButton 
                    key={type.label}
                    active={inlineStyleState.has(type.style)}
                    onToggle={props.onToggle}
                    label={type.icon}
                    style={type.style}
                />
            ))}
        </div>
    )
};

export default InlineStyleControls;