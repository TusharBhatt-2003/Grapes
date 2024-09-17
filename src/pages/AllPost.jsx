import { useState, useEffect } from 'react';
import AppwriteService from "../appwrite/conf";
import { Container, PostCard } from '../components';
import './AllPages.css';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [hoveredId, setHoveredId] = useState(null);  // State to track hovered post
    const [hoverTimeout, setHoverTimeout] = useState(null); // State to handle timeout

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postResponse = await AppwriteService.getPosts([]);
                if (postResponse) {
                    setPosts(postResponse.documents);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleMouseEnter = (postId) => {
        const timeout = setTimeout(() => {
            setHoveredId(postId); // Set the post to be highlighted after 4 seconds
        }, 2000); // 2 seconds delay
        setHoverTimeout(timeout);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);  // Clear the timeout on mouse leave
        setHoveredId(null);  // Reset hover state
    };

    return (
        <div className='w-full h-max py-1 m-0 -z-10'>
            <Container>
                <div className='list m-4'>
                    {posts.map((post) => (
                        <div 
                            key={post.$id} 
                            className={`post-card m-4 rounded-xl shadow-xl overflow-hidden ${hoveredId && hoveredId !== post.$id ? 'blur-background' : ''}`}
                            onMouseEnter={() => handleMouseEnter(post.$id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <PostCard
                                $id={post.$id}
                                title={post.title}
                                featuredImage={post.featuredImage}
                                name={post.name} // Use userName directly from post
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
