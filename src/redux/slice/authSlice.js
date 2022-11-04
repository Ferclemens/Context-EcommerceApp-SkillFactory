import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: null,
    userName: null,
    userID:null,
    role: null,
    isLoggedIn: false,
}

const authSlice = createSlice({
   name: 'authSlice',
   initialState,
   reducers: {
        SET_ACTIVE_USER: (state, action)=>{
            const { email, userName, userID, role } = action.payload
            state.email = email
            state.userName = userName
            state.userID = userID
            state.role = role || 'user'
            state.isLoggedIn = true
            console.log(state.email, state.userName,state.userID, state.role)
        },
        REMOVE_ACTIVE_USER: (state, action)=>{
            state.email = null
            state.userName = null
            state.userID = null
            state.role = null
            state.isLoggedIn = false
            console.log(state.isLoggedIn);
        }
   },
})


// Action creators are generated for each case reducer function
export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectEmail = (state) => state.auth.email
export const selectUserName = (state) => state.auth.userName
export const selectUserID = (state) => state.auth.userID
export const selectUserRole = (state) => state.auth.role

export default authSlice.reducer