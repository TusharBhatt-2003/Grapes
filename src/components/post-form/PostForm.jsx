import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import AppwriteService from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post, onPostCreated }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "", // Ensure slug is set properly for new posts
            content: post?.content || "No Content",
            status: post?.status || "active",
            name: post?.name || "Anonymous",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const Submit = async (data) => {
        try {
            let file;
            if (data.image && data.image[0]) { // Check for data.image before accessing data.image[0]
                file = await AppwriteService.uploadFile(data.image[0]);
            }
            let dbPost;
            if (post && post.$id) {
                // Update existing post
                if (file && post.featuredImage) {
                    await AppwriteService.deleteFile(post.featuredImage); // Remove old image
                }

                dbPost = await AppwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });
            } else {
                // Create new post
                const fileId = file ? file.$id : null;
                dbPost = await AppwriteService.createPost({
                    ...data,
                    userId: userData.$id, // Ensure userId is added to the post
                    featuredImage: fileId,
                });
            }

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`); // Navigate to the new post
                if (onPostCreated) onPostCreated(); // Callback to update posts list
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Optionally set error state and display it in the UI
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "") // Remove special characters
                .replace(/\s+/g, "-")           // Replace spaces with dashes
                .replace(/^-+|-+$/g, "");       // Remove leading or trailing dashes
        }
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(Submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE 
                label="Content :" 
                name="content" 
                control={control} defaultValue={getValues("content")}
                {...register("content", { required: true })}  />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Post Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: false })} // Required if creating new post
                />
                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={AppwriteService.getFilePreview(post.featuredImage)}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                  <Input
                    label="Author's Name :"
                    placeholder="anonymous"
                    className="mb-4"
                    {...register("name", { required: false })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-[#7FDBCC] hover:bg-[#86CFAE]"} className="w-full">
                    {post ? "Update" : "Post"}
                </Button>
            </div>
        </form>
    );
}
