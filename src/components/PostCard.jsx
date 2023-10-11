import React from 'react'
import databaseService from '../appwrite/appwriteConfig'
import {Link} from 'react-router-dom'
import '../index.css'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-auto h-[20rem] bg-gray-100 dark:bg-gray-500 rounded-xl pr-4 pl-4 pt-4'>
            <div className='w-auto h-[12rem]'>
                <img className='w-[20rem] h-[10rem] rounded-xl' src={databaseService.getFilePreview(featuredImage)} alt={title}
                />
            </div>
            <h2
            className='text-xl flex justify-center items-center dark:text-gray-300 text-center h-auto font-bold flex-wrap'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard;