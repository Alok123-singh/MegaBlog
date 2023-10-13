import React, {useState, useEffect} from 'react'
import { Container } from '../components/index.js'
import databaseService from '../appwrite/appwriteConfig'
import { useSelector } from 'react-redux';
import Pagination from '../components/Pagination.jsx';

function AllPosts() {

    const search = useSelector(state => state.search.search);
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

    const check = (post) => {
        return post.title.toLowerCase().includes(search.toLowerCase()) || search === '';
    }

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
        <div className='w-full py-10 dark:bg-slate-600 dark:text-gray-300'>
            <Container>
                <div className='flex flex-wrap justify-center md:justify-evenly'>
                    <Pagination items={posts} itemsPerPage={12} />
                    {/* {posts.map((post) => {

                        return check(post) ?
                        <div key={post.$id} className='p-2 w-[18rem]'>
                            <PostCard {...post} />
                        </div> : null
                    })} */}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
