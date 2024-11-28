import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPlus, FaUserAlt } from "react-icons/fa"; // Import icons
import UsernameDisplay from "../UsernameDisplay";

function Header() {
  const authStatus = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const navItems = [
    {
      icon: <FaHome size={24} />, // Home icon
      name: "Feed",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      icon: <FaPlus size={24} />, // Plus icon
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      icon: <FaUserAlt size={24} />, // User icon
      name: "Your Posts",
      slug: "/",
      active: true,
    },
  ];

  return (
    <header className="bg-black border-2 w-fit border-[#931313] overflow-hidden flex items-center justify-center h-16 text-white z-50 fixed bottom-1 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-2xl shadow-md md:top-0 mb-2 mt-5">
      <Container>
<<<<<<< HEAD
        <nav>
          <ul className="flex items-center justify-between gap-5">
            {navItems.map(
              (item) =>
                item.active && ( // Only show active items
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="flex flex-col items-center py-1 duration-200 hover:text-[#931313]"
                    >
                      <span>{item.icon}</span>
                    </button>
                  </li>
                ),
=======
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo />
              </Link>
              <UsernameDisplay />
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-3 py-1 duration-200 hover:bg-[#e4ffbec7] rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
>>>>>>> 30b7709d2c6805388f97e1f995c29d9cd4117428
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

<<<<<<< HEAD
export default Header;
=======
export default Header
>>>>>>> 30b7709d2c6805388f97e1f995c29d9cd4117428
