import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/authSlice';
import { Button, Input } from '../components/index.js';
import { useNavigate } from 'react-router-dom';

function UpdateUsername() {

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const update = async (data) => {
        console.log("Data : ",data);
        setError('');

        try {
            const user = await authService.updateUsername(data);
            if (user) {
                dispatch(setUserData(user));
            }
            navigate('/my-account');
            
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='dark:bg-slate-600 dark:text-gray-300 h-[20rem] w-full flex justify-center items-center'>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(update)} className='flex flex-wrap flex-col items-center justify-center'>
                <label>User Name : </label>
                <Input
                type="text"
                placeholder = "Enter your name"
                className='outline-none cursor-pointer w-[20.2rem] h-[2.5rem] rounded-lg focus:bg-blue-300 bg-blue-300 p-2 my-2 text-center placeholder-gray-600' 
                {...register("name", {
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

export default UpdateUsername
