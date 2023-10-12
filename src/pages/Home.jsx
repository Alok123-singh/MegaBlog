import React, {useEffect, useState} from 'react'
import databaseService from "../appwrite/appwriteConfig";
import {Container, PostCard} from '../components/index.js'
import { useSelector } from 'react-redux';
import authService from '../appwrite/auth';

function Home() {

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const loginStatus = useSelector(state => state.auth.loginStatus);
    const userData = useSelector(state => state.auth.userData);
    console.log(loginStatus);

    useEffect(() => {
        databaseService.getAllPosts()
        .then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
        .finally(() => setLoading(false))
        

        if(loginStatus === true){
            console.log("User data : ",userData);
        }

    }, [])
  
    const showMessage = () => {
        return (loginStatus === false) ?
        (
            <div className="w-full pb-6 text-center dark:bg-slate-600 dark:text-gray-300">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold cursor-default hover:text-gray-700 dark:hover:text-gray-400">
                                Login to add your posts !
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        ) :
        ( 
            <div className="w-full pb-6 text-center dark:bg-slate-600 dark:text-gray-300 ">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold cursor-default hover:text-gray-700 dark:hover:text-gray-400">
                                Welcome back {userData?.name} !
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return loading ? (
        <div className='dark:bg-slate-600 w-full flex justify-center items-center h-[10rem]'>
          <div className='bg-blue-400 w-[6rem] flex justify-center items-center p-2 m-2 rounded-md'> Loading! </div>
        </div>
    
    ) : 
    (
        <div className='w-full py-10 dark:bg-slate-600 dark:text-gray-300'>
            {showMessage()}
            <Container>
                <div className='flex flex-wrap justify-center md:justify-between'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-[18rem]'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home