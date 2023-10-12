import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/appwriteConfig";
import { Button, Container } from "../components/index.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            databaseService.getPost(slug)
            .then((post) => {
                if (post) setPost(post);
                else navigate("/");
            })
            .finally(() => setLoading(false));

        } else navigate("/");

    }, [slug, navigate]);

    const deletePost = () => {
        setLoading(true);
        databaseService.deletePost(post.$id)
        .then((status) => {
            if (status) {
                databaseService.deleteFile(post.featuredImage);
                navigate("/");
            }
        })
        .finally(() => setLoading(false));
        
    };

    return loading ? (
        <div className='dark:bg-slate-600 w-full flex justify-center items-center h-[10rem]'>
          <div className='bg-blue-400 w-[6rem] flex justify-center items-center p-2 m-2 rounded-md'> Loading! </div>
        </div>
    
    ) : 
    post ? (
        <div className="py-8 dark:bg-slate-600 dark:text-gray-300">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={databaseService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500 dark:bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500 dark:bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-center">{post.title}</h1>
                </div>
                <div className="w-full h-auto p-4 border border-blue-400 border-l-fuchsia-500 rounded-3xl overflow-y-auto">
                    <div contentEditable spellcheck="false" className="w-full h-auto outline-none">
                        {parse(post.content)}
                    </div>
                </div>
                
            </Container>
        </div>
    ) : null;
}