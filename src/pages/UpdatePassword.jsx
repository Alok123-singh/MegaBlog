import React, { useState, useEffect } from 'react'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../store/authSlice';
import { Button, Input } from '../components/index.js';
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const userData = useSelector(state => state.auth.userData);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [userId,setUserId] = useState('');

    const update = async (data) => {
        setLoading(true);
        if(data.newPassword === ''){
            alert('Enter new password');
            setLoading(false);
            return;
        }

        if(data.oldPassword === ''){
            alert('Enter old password');
            setLoading(false);
            return;
        }

        console.log("Data : ",data);
        setError('');

        try {
            const user = await authService.updatePassword(data);
            if (user) {
                dispatch(setUserData(user));
                alert('Your password has been changed !');
                navigate('/my-account');
            }
            
        } catch (error) {
            setError(error.message)
        }
        setLoading(false);
    }

    useEffect(() => {
        setUserId(userData.$id);

    }, []);

    return loading ? (
        <div className='dark:bg-slate-600 w-full flex justify-center items-center h-[10rem]'>
          <div className='bg-blue-400 w-[6rem] flex justify-center items-center p-2 m-2 rounded-md'> Loading! </div>
        </div>
    
    ) : 
    (
        <div className='dark:bg-slate-600 dark:text-gray-300 h-[20rem] py-5 w-full flex justify-center items-center'>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(update)} className='flex flex-wrap flex-col items-center justify-center '>
                

                <label>New Password : </label>
                <Input
                type="text"
                placeholder = "Enter new Password"
                className='outline-none cursor-pointer w-[15.2rem] h-[2.5rem] rounded-lg focus:bg-blue-300 bg-blue-300 p-2 my-2 text-center placeholder-gray-600' 
                {...register("newPassword", {
                    required: false
                })}
                />

                <label>Old Password : </label>
                <Input
                type="text"
                placeholder = "Enter old Password"
                className='outline-none cursor-pointer w-[15.2rem] h-[2.5rem] rounded-lg focus:bg-blue-300 bg-blue-300 p-2 my-2 text-center placeholder-gray-600' 
                {...register("oldPassword", {
                    required: false
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
