import { useEffect, useState } from 'react';
import appwriteService from "../appwrite/conf";
import { Container, PostCard } from '../components';
import AuthService from "../appwrite/auth";
import './AllPages.css';

function Home() {
    const [posts, setPosts] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const fetchPostsAndUser = async () => {
            try {
                // Get current user
                const user = await AuthService.getCurrentUser();
                if (user) {
                    setCurrentUserId(user.$id);
                }

                // Get posts
                const postResponse = await appwriteService.getPosts();
                if (postResponse) {
                    // Filter posts based on current user's ID
                    const userPosts = postResponse.documents.filter(post => post.userId === currentUserId);
                    setPosts(userPosts);
                }
            } catch (error) {
                console.error('Error fetching posts or user:', error);
            }
        };

        fetchPostsAndUser();
    }, [currentUserId]);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">      
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts available or please login
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full h-max py-1'>
            <Container>
                <div className='flex flex-col justify-center text-center m-3'>
                    <h1 className='font-bold text-2xl'>Your Posts</h1>
                    <h2 className='text-xl text-gray-500'>
                        Total Posts: {posts.length}
                    </h2>
                </div>
                <div className='list p-2'>
                    {posts.map((post) => (
                        <div key={post.$id} className='post-card m-2 overflow-hidden rounded-xl shadow-lg'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
