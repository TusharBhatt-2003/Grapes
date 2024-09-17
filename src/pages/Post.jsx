import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    // Add logs to debug userData and post
    console.log("User Data:", userData);
    console.log("Post Data:", post);

    const isAuthor = post && userData && post.userId === userData.$id;

    console.log("Is Author:", isAuthor);  // This should output true if user is the author

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
       <div className="flex justify-center">
         <div className="py-[5rem] w-[50rem]">
            <Container>
                <div className="w-full flex justify-center mb-4 relative  rounded-xl p-2">
                    {/* Conditionally render the image only if post.featuredImage exists */}
                    {post.featuredImage && (
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl w-[50%]"
                        />
                    )}

                    {/* Show Edit and Delete buttons only if the user is the author */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6 grid gap-1 w-fit">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-[#A7D996]" className="w-full">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-[#C95147]" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="text-center w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="bg-white m-3 p-[1rem] border-2 rounded-3xl border-red-800 browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
       </div>
    ) : null;
}
