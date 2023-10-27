import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../store/authSlice';
import { Button, Input } from '../components/index.js';
import { useNavigate } from 'react-router-dom';

function UpdateEmail() {

    const userData = useSelector(state => state.auth.userData);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm({
        defaultValues: {
            "email" : userData.email
        }
    });
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const update = async (data) => {
        setLoading(true);
        console.log("Data : ",data);
        setError('');
        if(data.password === ''){
            alert('Enter your password!');
            setLoading(false);
            return;
        }

        try {
            const user = await authService.updateEmail(data);
            if (user) {
                dispatch(setUserData(user));
                navigate('/my-account');
            }
            
        } catch (error) {
            setError(error.message)
        }
        setLoading(false);
    }

    return loading ? (
        <div className='dark:bg-slate-600 w-full flex justify-center items-center h-[10rem]'>
        <div className='bg-blue-400 w-[6rem] flex justify-center items-center p-2 m-2 rounded-md'> Loading! </div>
        </div>

    ) : 
    (
        <div className='h-[20rem] dark:bg-slate-600 dark:text-gray-300 w-full flex justify-center items-center'>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(update)} className='flex w-[80%] sm:w-[60%] md:w-[40%] flex-wrap flex-col items-center justify-center'>
                <label>Email : </label>
                <Input
                type="email"
                placeholder = "Enter new email"
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
                    required: false
                })}
                />

                <Button type='submit' className=' mt-6 w-[7rem] h-[2.5rem] bg-black text-white rounded-3xl hover:bg-slate-800'>
                    Update
                </Button>
            </form>
        </div>
    )
}

export default UpdateEmail
