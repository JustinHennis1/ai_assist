import React, { useState } from 'react';
import { clearSelection } from '../js/dropdown.js';

function CustomDropdown({ title, options }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [titleItem, setTitle] = useState(title);

    const toggleDropdown = () => {
        clearSelection();
        setDropdownOpen(prevState => !prevState);
    };

    return (
        <div className="dropdown">
            {title && (
                <button type="button" onClick={toggleDropdown}>
                    {titleItem ? titleItem : title}
                </button>
            )}

            <ul className="dropdown-menu" style={{ display: dropdownOpen ? 'block' : 'none', maxHeight: '200px', overflowY: 'auto' }}>
                {options.map((option, index) => (
                    <button key={index} className="dropdown-item" value={option} onClick={() => setTitle(option)}>
                        {option}
                    </button>
                ))}
            </ul>
        </div>
    );
}

export default CustomDropdown;
