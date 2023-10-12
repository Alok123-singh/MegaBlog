import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components/index.js'
import databaseService from "../appwrite/appwriteConfig.js";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {

    const [loading, setLoading] = useState(true);
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
            .finally(() => setLoading(false));

        } else {
            navigate('/')
        }
        
    }, [slug, navigate])


  return loading ? (
        <div className='dark:bg-slate-600 w-full flex justify-center items-center h-[10rem]'>
        <div className='bg-blue-400 w-[6rem] flex justify-center items-center p-2 m-2 rounded-md'> Loading! </div>
        </div>

    ) : 
    post ? (
        <div className='py-8 dark:bg-slate-600 dark:text-gray-200'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>

  ) : null
}

export default EditPost