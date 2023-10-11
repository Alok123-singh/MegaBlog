import React, { useState, useEffect } from 'react'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../store/authSlice';
import { Button, Input } from '../components/index.js';
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const userData = useSelector(state => state.auth.userData);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [userId,setUserId] = useState('');

    const update = async (data) => {
        console.log("Data : ",data);
        setError('');

        try {
            const user = await authService.updatePassword(data);
            if (user) {
                dispatch(setUserData(user));
            }
            navigate('/my-account');
            
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        setUserId(userData.$id);

    }, []);

    return (
        <div className='dark:bg-slate-600 dark:text-gray-300 h-[20rem] py-5 w-full flex justify-center items-center'>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(update)} className='flex flex-wrap flex-col items-center justify-center '>
                

                <label>New Password : </label>
                <Input
                type="text"
                placeholder = "Enter new Password"
                className='outline-none cursor-pointer w-[15.2rem] h-[2.5rem] rounded-lg focus:bg-blue-300 bg-blue-300 p-2 my-2 text-center placeholder-gray-600' 
                {...register("newPassword", {
                    required: true
                })}
                />

                <label>Old Password : </label>
                <Input
                type="text"
                placeholder = "Enter old Password"
                className='outline-none cursor-pointer w-[15.2rem] h-[2.5rem] rounded-lg focus:bg-blue-300 bg-blue-300 p-2 my-2 text-center placeholder-gray-600' 
                {...register("oldPassword", {
                    required: true
                })}
                />

                

                <Button type='submit' className='mt-6 w-[7rem] h-[2.5rem] bg-black text-white rounded-3xl hover:bg-slate-800'>
                    Update
                </Button>
            </form>
        </div>
    )
}

export default UpdatePassword
