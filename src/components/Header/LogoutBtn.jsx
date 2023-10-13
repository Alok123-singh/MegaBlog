import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout());
        })
        .catch()

    };

    return (
        <button 
        className='pt-4 sm:pt-0 px-2 py-2 sm:my-4 duration-200 hover:bg-blue-100 dark:hover:bg-emerald-700  rounded-full'
        onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn;