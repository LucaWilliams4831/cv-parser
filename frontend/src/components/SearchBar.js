import React from 'react';

import './SearchBar.css';

const SearchBar = props => {
    return (
    <div className="search-bar">
        <input 
            className="search-bar-input form-control form-control-lg form-control-borderless" 
            onChange={props.handleInput} 
            type="search" 
            placeholder="Enter skill" 
        />
    </div>
    )
};

export default SearchBar;