import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/conf";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null); // Fix typo: setPosts -> setPost
  const { slug } = useParams(); // Assuming slug is used to identify the post
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      // Fetch the post based on slug or ID
      appwriteService
        .getPost(slug)
        .then((post) => {
          // Ensure 'getPost' is singular
          if (post) {
            setPost(post); // Set the post data for editing
          } else {
            navigate("/"); // Redirect if post is not found
          }
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          navigate("/"); // Handle error and redirect to home
        });
    } else {
      navigate("/"); // Redirect if slug is not available
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        {/* Pass post data to PostForm for editing */}
        <PostForm post={post} />
      </Container>
    </div>
  ) : (
    <div className="p-8 text-center">
      <h1>Post not found</h1>
      <p>
        The requested post could not be found. Please check the URL and try
        again.
      </p>
      <button onClick={() => navigate("/")} className="hover:underline">
        Go back to the home page
      </button>
    </div>
  );
}

export default EditPost;
