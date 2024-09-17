import {Container, Logo, LogoutBtn, } from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UsernameDisplay from '../UsernameDisplay'

function Header() {
  const authStatus = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const navItems = [
    
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "Feed",
      slug: "/all-posts",
      active: authStatus,
  },
  {
    name: 'Your Posts',
    slug: "/",
    active: true
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='z-10 fixed top-0 left-0 right-0 py-1 shadow bg-[#FFFFF8] '>
      <Container>
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
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header