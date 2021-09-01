import React from 'react';

import HeaderStyleDropdown from './HeaderStyleDropdown';
import StyleButton from './StyleButton';

import classes from './BlockStyleControls.module.css';

const BlockStyleControls = (props) => {

    const blockStyleState = props.editorState;
    const selection = blockStyleState.getSelection();
    const blockType = blockStyleState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    const BLOCK_TYPES = [
        { label: 'Blockquote', style: 'blockquote', icon: '""' },
        { label: 'UL', style: 'unordered-list-item', icon: 'UL' },
        { label: 'OL', style: 'ordered-list-item', icon: 'OL' },
        { label: 'Code Block', style: 'code-block', icon: '</>' },
    ];

    const HEADER_TYPES = [
        { label: 'H1', style: 'header-one' },
        { label: 'H2', style: 'header-two' },
        { label: 'H3', style: 'header-three' },
        { label: 'H4', style: 'header-four' },
        { label: 'H5', style: 'header-five' },
        { label: 'H6', style: 'header-six' },
    ];

    return (
        <div className={classes.controls}>
            <HeaderStyleDropdown 
                headerOptions={HEADER_TYPES}
                active={blockType}
                onToggle={props.onToggle}
            />
            {BLOCK_TYPES.map(type => (
            <StyleButton 
                key={type.label}
                active={type.style === blockType}
                onToggle={props.onToggle}
                label={type.icon}
                style={type.style}
            />
            ))}
        </div>
    );
};

export default BlockStyleControls;