import { useEffect, useState } from "react";
import AuthService from "../appwrite/auth";

const UsernameDisplay = () => {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

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

    fetchUsername();
  }, []);

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
};

export default UsernameDisplay;
