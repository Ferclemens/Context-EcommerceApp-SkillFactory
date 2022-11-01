import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import {auth, app, db} from '../firebase/firebase'
import Swal from 'sweetalert2'
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";


const Login = () => {
    const [isRegistered, setIsRegistered] = useState(false)
    
    const navigate = useNavigate()
    const registerUser = async (email, password, role) => {
        console.log('registerUser', email, password, role);
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        ).then((userData) => {
            console.log('userData', userData)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 2000
              })
            return userData
        })
        //console.log('result', result);
        const userRef = doc(db, `users/${result.user.uid}`)
        setDoc(userRef,{email, role})
        navigate('/')
    }
    
    const SubmitUser = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const role = e.target.role.value
        //console.log(email, password, role);

        if (isRegistered) {
            registerUser(email, password, role)
        } else {
            signInWithEmailAndPassword(auth, email, password)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 2000
              })
            navigate('/')
        }
    }

    return (
        <div>
            {isRegistered ? <h1>Register</h1> : <h1>Login</h1>}
            <Form onSubmit={(e) => SubmitUser(e)}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email"/>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Enter password"/>
                    <Form.Label>Rol</Form.Label>
                    <select id='role' name="role">
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>
                    </select>
                </Form.Group>
                <Button variant="primary" type="submit" className="mb-3">
                    {isRegistered
                        ? 'Register' : 'Lets In!'
                    }
                </Button>
            </Form>
            <Link to={'/register'}><Button variant="primary" onClick={() => setIsRegistered(!isRegistered)}>
                    {isRegistered
                        ? 'Have account? log in' : 'Don\'t have account? Register'
                    }
            </Button>
            </Link>
        </div>
    )
}
export default Login