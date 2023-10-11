import React, {useState, useEffect} from 'react'
import { Container,PostCard } from '../components/index.js'
import databaseService from '../appwrite/appwriteConfig'
import { useSelector } from 'react-redux';

function AllPosts() {

    const [posts,setPosts] = useState([]);
    const userData = useSelector(state => state.auth.userData);
    
    useEffect(() => {
        databaseService.getAllPosts([])
        .then((posts) => {
            if(posts){
                setPosts(posts.documents);
            }
        })


    }, []);

    return (
        <div className='w-full pt-[4.5rem] pb-[5rem] dark:bg-slate-600'>
            <Container >
                <div className='w-full flex md:justify-normal flex-col items-center md:flex-row'>
                    {posts?.map((post) => {
                        console.log("Post : ",post);
                        // console.log(userData.$id);
                        return post?.userId == userData?.$id ?
                        <div key={post.$id} className='p-2 w-[20rem]'>
                            <PostCard {...post} />
                        </div>
                        : null
                    })}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
