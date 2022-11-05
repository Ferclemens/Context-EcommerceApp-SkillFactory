import { useSelector } from 'react-redux' //selecciona cualquier informacion de mi store
import { selectIsLoggedIn, selectUserRole } from '../redux/slice/authSlice'



const ShowOnLogin = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if(isLoggedIn){
        return children
    }
    return null
}

export const ShowOnLogout = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if(!isLoggedIn){
        return children
    }
    return null
}

export const ShowAdmin = ({children}) => {
    const adminRole = useSelector(selectUserRole)
    if(adminRole === 'user'){
        return null
    }
    return children
}

export default ShowOnLogin