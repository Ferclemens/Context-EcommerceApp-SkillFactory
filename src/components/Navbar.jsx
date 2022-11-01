import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../styles/Navbar.css'
import { Stack } from "react-bootstrap";
import { app, auth, db } from '../firebase/firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import Swal from 'sweetalert2'
import { doc, getDoc } from "firebase/firestore";

export const Navbar = () => {
    const [user, setUser] = useState(false)
    const authUser = getAuth(app)

    const getUserFirestore = async (uid) => {
        //trae el usuario por ID
        const docRef = doc(db,`users/${uid}`)
        const docSnap = await getDoc(docRef)
        //console.log('docSnap', docSnap);
        const role = docSnap.data().role
        //traemos el rol del usuario
        return role

    }
    const setUserWithFirestoreRole = (userFromFirebase) => {
        //armamos el objeto user
        getUserFirestore(userFromFirebase.uid)
        .then((role) => {
            const userWithRole = {
                uid: userFromFirebase.uid,
                email: userFromFirebase.email,
                role: role,
            }
            setUser(userWithRole);
        })
    }
    onAuthStateChanged(auth, (userFromFirebase) => {
        if (userFromFirebase) {
            if (!user) {
                setUserWithFirestoreRole(userFromFirebase);
            }
        } else {
            setUser(null);
        } 
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
    console.log('Navbar user', user);
    return (
        <div className="navbarContainer">
            <div>
                <Link to={'/'}><img src='https://cdn-icons-png.flaticon.com/512/2981/2981297.png' className="logoImg"/></Link>
                <h1>E-commerce App</h1>
            </div>
            <div>
                {user && <h2>Welcome! {user.email}</h2>}
                {user && <Link to={'/create'}><Button variant="primary">Create</Button></Link>}
                {user 
                    ? <Button variant="primary" onClick={() => signOutUser()}>Log out</Button> 
                    : <Link to={'/login'}><Button variant="primary">Login</Button></Link>
                }
            <Link to={'/cart'}><img src='https://cdn-icons-png.flaticon.com/512/2331/2331970.png' className='cartWidget'/></Link>
            </div>
        </div>
        )
}

    {/* div className="navbarContainer">
        <Link to={'/'}>Firebase E-commerce App</Link>
        <Stack className="ButtonsContainer" direction="horizontal" gap={3}>
            {user && <h2>Welcome! {user.email}</h2>}
            {user && <Link to={'/create'}><Button variant="primary">Create</Button></Link>}
            {user 
                ? <Button variant="primary" onClick={() => signOutUser()}>Log out</Button> 
                : <Link to={'/login'}><Button variant="primary">Login</Button></Link>
            }
        </Stack>
        <img src='https://cdn-icons-png.flaticon.com/512/2331/2331970.png' className='cartWidget'/>
    </div> */}