import { Link } from 'react-router-dom';
import Logo from '../assets/meditate-logo.png';
import { ModeToggle } from './mode-toggle';
const Navbar = () =>{
    
    const navbarTextClass = `hover:scale-110 transition transform duration-200 ease-in-out px-3 py-2 rounded`;
  
    return (
      <nav className="bg-transparent text-[#5A5A5A] py-4 w-screen">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/"><img src={Logo} height={50} width={50} alt="logo" className="rounded-full hover:scale-110 "/></Link>
            <Link to="/" className={navbarTextClass}>Home</Link>
            <Link to="/journal" className={navbarTextClass}>Create Journal</Link>
            <Link to="/viewjournal" className={navbarTextClass}>View My Journals</Link>
          </div>
          <div className="flex space-x-4">
            {/* {!token ? (
              <Link to="/login" className={navbarTextClass}>Login</Link>
            ) : (
              <Link to="#" className={navbarTextClass} onClick={handleLogout}>Logout</Link>
            )} */}
            <Link to="/register" className={navbarTextClass}>Register</Link>
            <ModeToggle />
          </div>
        </div>
      </nav>
    )
}

export default Navbar

