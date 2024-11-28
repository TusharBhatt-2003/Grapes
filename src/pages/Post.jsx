import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components";
import DeletePopup from "../components/DeletePopup"; // Import DeletePopup
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control DeletePopup visibility

  const isAuthor = post && userData && post.userId === userData.$id;

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
      <div
        className={`pb-[5rem] w-[50rem] ${isPopupOpen ? "blur-md" : ""}`} // Apply blur when popup is open
      >
        <Container>
          <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
            {post.featuredImage && (
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-xl w-[50%]"
              />
            )}

            {isAuthor && (
              <div className="absolute right-6 top-6 grid gap-1 w-fit">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-[#A7D996]" className="w-full">
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-[#C95147]"
                  onClick={() => setIsPopupOpen(true)} // Open the popup
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="text-center w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          <div className="bg-white m-3 leading-9 p-[1rem] border-2 rounded-3xl border-red-800">
            {parse(post.content)}
          </div>
        </Container>
      </div>

      {/* Render the DeletePopup */}
      <DeletePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)} // Close popup without deleting
        onConfirm={deletePost} // Trigger the post deletion
      />
    </div>
  ) : null;
}
