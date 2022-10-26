import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../styles/Navbar.css'
import { Stack } from "react-bootstrap";
import { app, auth } from '../firebase/firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import Swal from 'sweetalert2'

const Navbar = () => {
    const [user, setUser] = useState(false)
    const authUser = getAuth(app)

    onAuthStateChanged(auth, (userFromFirebase) => {
        userFromFirebase ? setUser(userFromFirebase) : setUser(false)
    })

    const signOutUser = () => {
        signOut(authUser)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 2000
          })
    }

    return (
        <div className="navbarContainer">
            <Link to={'/'}>Firebase E-commerce App</Link>
            <Stack className="ButtonsContainer" direction="horizontal" gap={3}>
                {user && <Link to={'/create'}><Button variant="primary">Create</Button></Link>}
            </Stack>
            {user 
                ? <Button variant="primary" onClick={() => signOutUser()}>Log out</Button> 
                : <Link to={'/login'}><Button variant="primary">Login</Button></Link>
            }
        </div>

    )
}
export default Navbar