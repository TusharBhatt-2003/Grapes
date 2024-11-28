<<<<<<< HEAD
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        window.location.reload(); // Refresh the page after logout
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <button
      className="text-red-800 inline-block px-3 py-1 duration-200 hover:bg-[#FEB8A9] rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
=======
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
            window.location.reload(); // Refresh the page after logout
        }).catch((error) => {
            console.error("Error logging out:", error);
        });
    };

    return (
        <button
            className='text-red-800 inline-block px-3 py-1 duration-200 hover:bg-[#FEB8A9] rounded-full'
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
>>>>>>> 30b7709d2c6805388f97e1f995c29d9cd4117428
}

export default LogoutBtn;
