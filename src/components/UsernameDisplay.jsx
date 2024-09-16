import{ useEffect, useState } from "react";
import AuthService from "../appwrite/auth"
const UsernameDisplay = () => {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const user = await AuthService.getCurrentUser();
                if (user) {
                    setUsername(user.name);  // Assuming 'name' is the username field
                } else {
                    setUsername("Please Sign In");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUsername("Error fetching username");
            } finally {
                setLoading(false);
            }
        };

        fetchUsername();
    }, []);

    return (
        <div>
            <h2>Username:</h2>
            {loading ? <p>Loading...</p> : <p>{username}</p>}
        </div>
    );
};

export default UsernameDisplay;
