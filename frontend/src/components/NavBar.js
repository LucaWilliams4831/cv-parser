import React from 'react'
import { Navbar } from 'react-bootstrap';
import logo from './logo.png';

import './NavBar.css';

const NavBar = () => {
    return (
        <Navbar className="navbar-top">
            <img src={logo} alt="JobLo" />
            <h1 className="navbrand"> &nbsp; JobLo</h1>
        </Navbar>
    )
};

export default NavBar;