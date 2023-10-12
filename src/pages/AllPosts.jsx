import React, {useState, useEffect} from 'react'
import { Container,PostCard } from '../components/index.js'
import databaseService from '../appwrite/appwriteConfig'
import { useSelector } from 'react-redux';

function AllPosts() {

    const [loading, setLoading] = useState(true);
    const [posts,setPosts] = useState([]);
    const userData = useSelector(state => state.auth.userData);
    const [isAuthor,setIsAuthor] = useState(false);
    
    useEffect(() => {
        databaseService.getAllPosts([])
        .then((posts) => {
            if(posts){
                setPosts(posts.documents);
            }
        })
        .finally(() => setLoading(false))


    }, []);

    useEffect(() => {
        posts?.map(post => {
            if(post?.userId === userData.$id) setIsAuthor(true);
            
        });

    }, [posts]);

    return loading ? (
        <div className='dark:bg-slate-600  w-full flex justify-center items-center h-[10rem]'>
          <div className='bg-blue-400 w-[6rem] flex justify-center items-center p-2 m-2 rounded-md'> Loading! </div>
        </div>
    
    )  :
       isAuthor === false ? 
    (<div className='w-full h-[10rem] flex justify-center items-center font-bold font dark:bg-slate-600 dark:text-gray-300'>
        No Posts yet!!
    </div>) : 
    (
        <div className='w-full pt-[4.5rem] pb-[5rem] dark:bg-slate-600'>
            <Container >
                <div className='w-full flex flex-col items-center lg:flex-row'>
                    {posts?.map((post) => {
                        console.log("Post : ",post);
                        // console.log(userData.$id);
                        return post?.userId == userData?.$id ?
                        <div key={post.$id} className='p-2 w-[19rem] flex flex-wrap'>
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
