import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../styles/Navbar.css'
import {useUserContext, useUserSingOutContext} from "./UserProvider";

export const Navbar = () => {
    const user = useUserContext()
    const logOut = useUserSingOutContext()
    
    console.log('Navbar user', user);
    return (
            <div className="navbarContainer">
                <div>
                    <Link to={'/'}><img src='https://cdn-icons-png.flaticon.com/512/2981/2981297.png' className="logoImg"/></Link>
                    <h1>E-commerce App</h1>
                </div>
                <div>
                    {user && <h2>Welcome! {user.email}</h2>}
                    {user && user.role === "admin" && <Link to={'/create'}><Button variant="primary">Create</Button></Link>}
                    {user 
                        ? <Button variant="primary" onClick={logOut}>Log out</Button> 
                        : <Link to={'/login'}><Button variant="primary">Login</Button></Link>
                    }
                 <Link to={'/cart'}><img src='https://cdn-icons-png.flaticon.com/512/2331/2331970.png' className='cartWidget'/></Link>
                </div>
            </div>
        )
}