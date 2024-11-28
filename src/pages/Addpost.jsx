import { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/conf"; // Adjust the import path as needed

function Addpost() {
  const [somePostObject, setSomePostObject] = useState(null); // Initialize as null for creating a new post

  // Fetch a post if editing an existing one
  useEffect(() => {
    const postId = "some-post-id"; // Replace with actual logic to get the post ID (e.g., from URL params)

    const fetchPost = async () => {
      if (postId) {
        const post = await appwriteService.getPost(postId);
        setSomePostObject(post);
      }
    };

    fetchPost();
  }, []); // Empty dependency array means this will only run on component mount

  // Handler for post creation or update
  const handlePostCreated = () => {
    // Logic to handle actions after a post is created or updated
    console.log("Post was created or updated");
  };

  return (
    <div className="py-8">
      <Container>
        <PostForm post={somePostObject} onPostCreated={handlePostCreated} />
      </Container>
    </div>
  );
}

export default Addpost;
