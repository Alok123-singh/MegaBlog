import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginStatus : false,
    userData: null,
    themeMode : 'light'
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.loginStatus = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.loginStatus = false;
            state.userData = null;
        },
        toggleTheme: (state) => {
            if(state.themeMode === 'light'){
                state.themeMode = 'dark';
            }
            else{
                state.themeMode = 'light';
            }
        },
        setUserData : (state,action) => {
            state.userData = action.payload;
        }
     }
})

export const {login, logout, toggleTheme, setUserData} = authSlice.actions;

export default authSlice.reducer;