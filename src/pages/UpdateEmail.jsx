import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/authSlice';
import { Button, Input } from '../components/index.js';
import { useNavigate } from 'react-router-dom';

function UpdateEmail() {

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const update = async (data) => {
        console.log("Data : ",data);
        setError('');

        try {
            const user = await authService.updateEmail(data);
            if (user) {
                dispatch(setUserData(user));
            }
            navigate('/my-account');
            
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='h-[20rem] w-full flex justify-center items-center'>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(update)} className='flex w-[30%] flex-wrap flex-col items-center justify-center'>
                <label>Email : </label>
                <Input
                type="email"
                placeholder = "Enter your email"
                className='outline-none cursor-pointer w-[22.5rem] h-[2.5rem] rounded-lg focus:bg-blue-300 bg-blue-300 p-2 my-2 text-center placeholder-gray-600' 
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />

                <label className='mt-4'>Password : </label>
                <Input 
                type="text" 
                placeholder = "Enter password"
                className='outline-none ml-[0rem] cursor-pointer w-[9rem] h-[2.5rem] rounded-lg text-center bg-blue-300 focus:bg-blue-300 p-2 m-2 placeholder-gray-600' 
                {...register("password", {
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

export default UpdateEmail
