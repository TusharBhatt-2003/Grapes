import { useEffect, useState } from "react";
import AuthService from "../appwrite/auth";

const UsernameDisplay = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

<<<<<<< HEAD
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        if (user) {
          // Split the name by spaces and get only the first word
          const firstName = user.name.split(" ")[0];
          setUsername(firstName);
        } else {
          setUsername(null); // No username if user is not logged in
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUsername(null); // In case of error, treat as no user
      } finally {
        setLoading(false);
      }
    };
=======
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const user = await AuthService.getCurrentUser();
                if (user) {
                    // Split the name by spaces and get only the first word
                    const firstName = user.name.split(' ')[0];
                    setUsername(firstName);
                } else {
                    setUsername(null); // No username if user is not logged in
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUsername(null); // In case of error, treat as no user
            } finally {
                setLoading(false);
            }
        };
>>>>>>> 30b7709d2c6805388f97e1f995c29d9cd4117428

    fetchUsername();
  }, []);

<<<<<<< HEAD
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        username && (
          <div className="flex">
            <h2 className="text-gray-500">:</h2>
            <p className="text-[#1A3470]">{username}</p>
          </div>
        ) // Only show username if user is logged in
      )}
    </div>
  );
=======
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                username && 
                <div className="flex">
                    <h2 className="text-gray-500">:</h2> 
                    <p className="text-[#1A3470]">{username}</p>
                </div> // Only show username if user is logged in
            )}
        </div>
    );
>>>>>>> 30b7709d2c6805388f97e1f995c29d9cd4117428
};

export default UsernameDisplay;
