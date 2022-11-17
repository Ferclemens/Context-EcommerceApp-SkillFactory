import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { app, auth, db } from '../firebase/firebase'
import Swal from 'sweetalert2'

const userContext = createContext()
const userSingOutContext = createContext()

export function useUserContext() {
    return useContext(userContext)
}
export function useUserSingOutContext() {
    return useContext(userSingOutContext)
}

const UserProvider = (props) => {
    const [user,setUser] = useState(null)
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
    //console.log('user login', user);

    return (
        <userContext.Provider value={user}>
            <userSingOutContext.Provider value={signOutUser}>
                {props.children}
            </userSingOutContext.Provider>
        </userContext.Provider>
    )
}
export default UserProvider