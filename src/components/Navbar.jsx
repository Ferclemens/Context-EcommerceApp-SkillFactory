import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../styles/Navbar.css'

const Navbar = () => {
    return (
        <div className="navbarContainer">
            <Link to={'/'}>Firebase E-commerce App</Link>
            <Link to={'/create'}><Button variant="primary">Create</Button></Link>
        </div>

    )
}
export default Navbar