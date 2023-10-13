import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import databaseService from "../../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true);
        if (post) {
            const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;

            if (file) {
                databaseService.deleteFile(post.featuredImage);
            }

            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null;

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await databaseService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
        setLoading(false);
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof(value) === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        setLoading(false);

    },[userData]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return loading ? (
            <div className='dark:bg-slate-600  w-full flex justify-center items-center h-[10rem]'>
            <div className='bg-blue-400 w-[6rem] flex justify-center items-center p-2 m-2 rounded-md'> Loading! </div>
            </div>

        )  : 
        (
            <form onSubmit={handleSubmit(submit)} className="flex w-full flex-wrap justify-center md:justify-normal">
                <div className="w-[100%] sm:w-[80%] md:w-2/3 px-2 md:pb-8">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4 dark:bg-gray-300 dark:placeholder-slate-700"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4 dark:bg-gray-300 dark:placeholder-slate-700"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="py-5 md:py-0 w-3/4 sm:w-1/2 md:w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4 dark:bg-gray-300 dark:placeholder-slate-700"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={databaseService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4 dark:bg-gray-300 dark:placeholder-slate-700"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        );
}