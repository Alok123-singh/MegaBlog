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
        className='mt-[0.6rem]  sm:pt-1 px-2 py-2 sm:my-[0.6rem] h-[2.3rem] flex justify-center items-center text-center duration-200 hover:bg-slate-400 dark:hover:bg-emerald-700  rounded-full'
        onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn;