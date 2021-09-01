import React from 'react';

// const HEADER_TYPES = [
//     { label: 'H1', style: 'header-one' },
//     { label: 'H2', style: 'header-two' },
//     { label: 'H3', style: 'header-three' },
//     { label: 'H4', style: 'header-four' },
//     { label: 'H5', style: 'header-five' },
//     { label: 'H6', style: 'header-six' },
// ];

const HeaderStyleDropdown = (props) => {
const _onToggle = (event) => {
    let value = event.target.value;
    props.onToggle(value);
};

    return (
        <select 
            value={props.active}
            onChange={_onToggle}
        >
            <option value=''>Header (none)</option>
            {props.headerOptions.map(heading => (
                <option key={heading.label} value={heading.style}>{heading.label}</option>
            ))}
        </select>
    );
};

export default HeaderStyleDropdown;