import { Link } from "react-router-dom";
import AppwriteService from "../appwrite/conf";

function PostCard({ $id, title, featuredImage, name }) {
  const imageUrl = featuredImage
    ? AppwriteService.getFilePreview(featuredImage)
    : "";

  return (
    <Link to={`/post/${$id}`}>
      <div className="  w-full bg-[white] shadow rounded-xl p-4 post-container">
        {/* Conditionally render the image section */}
        {featuredImage && (
          <div className="w-full justify-center mb-4">
            <img src={imageUrl} alt={title} className="rounded-xl" />
          </div>
        )}
        <h2 className="text-sm font-bold">{title}</h2>
        <p className="text-xs text-gray-500">Posted by: {name || "Unknown"}</p>
      </div>
    </Link>
  );
}

export default PostCard;
