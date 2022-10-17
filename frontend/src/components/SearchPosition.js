import React from 'react';
import { Row } from 'react-bootstrap';
import searchGlass from './searchGlass.png';

const SearchPosition = props => {
    return (
        <Row>
            <form className="card card-sm" style={{ width: "100vw" }}>
                <div className="card-body row no-gutters align-items-center">
                    <img src={searchGlass} alt="Search" />
                    <div className="col" style={{ marginLeft: "10px" }}>
                        <input className="form-control form-control-lg form-control-borderless" type="search" placeholder="Enter a post or position" onChange={props.handleInput} />
                    </div>
                    </div>
            </form>
        </Row>
    )
}

export default SearchPosition;
