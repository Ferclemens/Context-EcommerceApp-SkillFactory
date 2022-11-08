import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import '../styles/Header.css'
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { onAuthStateChanged, signOut } from "firebase/auth";
import ShowOnLogin, { ShowAdmin, ShowOnLogout } from "./hidenLinks";
import { REMOVE_ACTIVE_USER, selectUserName, SET_ACTIVE_USER } from "../redux/slice/authSlice";


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const MySwal = withReactContent(Swal);

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const name = useSelector(selectUserName) 
  
    const [user, setUser] = useState(null)

    const getUserFirestore = async (uid)=>{
        //const docRef = doc(firestore, 'user', uid)  <--- es lo mismo que lo de abajo
        //console.log('uid: ', uid)
        const docRef = doc(db, `users/${uid}`)//esto devuelve la referencia a donde apuntar
        const docSnap = await getDoc(docRef)//esto devuelve "una vista" del contenido que haya en esa ref
        const data = {...docSnap.data(), uid}//con el .data() simplifico la lectura de la info del usuario
        return data //conseguimos todos los tados del usuario
      }


    const setUserWithFirestoreRole = (userFromFirebase)=>{
        //traer el usuaro por UID - usar un metodo getUserFirestore <--- no existe HAY QUE CREARLO!!
        //console.log(userFromFirebase.uid)
        getUserFirestore(userFromFirebase.uid).then((data)=>{
          //console.log('data: ', data)
          // Armar el objeto con el usuario y el rol
          dispatch(SET_ACTIVE_USER({
            email: data.email,
            userName: data.name,
            userID: data.uid,
            role: data.role,
          }))
        })    
      }


    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserWithFirestoreRole(user)
          } else {
            setUser(null)
          }
        });
      },[])

      const logoutUser = ()=>{
        signOut(auth).then(() => {
          MySwal.fire({
            title: "Are you sure?",
            text: "You want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirm",
          }).then((result) => {
            if (result.isConfirmed) {
              MySwal.fire({
                title: "Log out",
                text: "Have an excellent day!",
                icon: "success",
                confirmButtonText: "Ok",
              });
              dispatch(REMOVE_ACTIVE_USER())
            }
          });
          navigate('/')
        }).catch((error) => {
          MySwal.fire({
            title: 'Oops...',
            text: error.message,
            icon: "error",
            confirmButtonText: "Ok",
          })
        });
      }

    return (
/*             <div className="navbarContainer">
                <div>
                    <Link to={'/'}><img src='https://cdn-icons-png.flaticon.com/512/2981/2981297.png' className="logoImg"/></Link>
                    <h1>E-commerce App</h1>
                </div>
                <div>
                    <ShowOnLogin>    
                        <h2>Welcome! {displayName}</h2>
                        <ShowAdmin>
                            <Link to={'/create'}><Button variant="primary">Create</Button></Link>
                        </ShowAdmin>
                        <Button variant="primary" onClick={logoutUser}>Log out</Button> 
                        <Link to={'/cart'}><img src='https://cdn-icons-png.flaticon.com/512/2331/2331970.png' className='cartWidget'/></Link>
                    </ShowOnLogin>
                    <ShowOnLogout>
                        <Link to={'/login'}><Button variant="primary">Login</Button></Link>
                        <Link to={'/register'}><Button variant="primary">Register</Button></Link>
                    </ShowOnLogout>
                </div>
            </div> */

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Link to='/' className='navbar__title'><Navbar.Brand><span className='navbar__title-span'>SF</span> e-commerce</Navbar.Brand></Link> 
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <ShowOnLogin>
                  <ShowAdmin>
                    <NavLink to='/admin' className={({isActive})=>(isActive ? 'navbar__admin isActive':'navbar__admin noActive')}><Navbar>Admin</Navbar></NavLink>
                  </ShowAdmin>
                </ShowOnLogin>
                  <NavLink to='/contact' className={({isActive})=>(isActive ? 'navbar__contact isActive':'navbar__contact noActive')}><Navbar>Contact us</Navbar></NavLink>
                </Nav>
                <Nav>
                  <ShowOnLogin>
                    <Link to='#' className='navbar__user'><Navbar><span className='navbar__user-hi'>Hi </span>{name}</Navbar></Link>
                    <NavLink to='/' className='navbar__login noActive' onClick={logoutUser} ><Navbar>Logout</Navbar></NavLink>
                    <NavLink to='/order-history' className={({isActive})=>(isActive ? 'navbar__order isActive':'navbar__order noActive')}><Navbar>My Orders</Navbar></NavLink>
                    <NavLink to='/cart' className={({isActive})=>(isActive ? 'navbar__cart isActive':'navbar__cart noActive')}><Navbar><span className="material-symbols-outlined">shopping_cart</span>0</Navbar></NavLink>
                  </ShowOnLogin>
                  <ShowOnLogout>
                    <NavLink to='/login' className={({isActive})=>(isActive ? 'navbar__login isActive':'navbar__login noActive')}><Navbar>Login</Navbar></NavLink>
                    <NavLink to='/register' className={({isActive})=>(isActive ? 'navbar__login isActive':'navbar__login noActive')}><Navbar>Register</Navbar></NavLink>
                  </ShowOnLogout>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )
}