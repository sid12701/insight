import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/meditate-logo.png';
import { ModeToggle } from './mode-toggle';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const navbarTextClass = `hover:scale-110 transition transform duration-200 ease-in-out px-3 py-2 rounded dark:text-white`;
  const activeClass = `${navbarTextClass} font-bold`;

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookie.get('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, [location]);

  const handleLogout = () => {
    Cookie.remove('token');
    setIsLoggedIn(false);
    toast({
      title: "Success",
      description: "Logged out",
      duration: 3000,
    });
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-transparent text-[#5A5A5A] py-4 w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-0">
        <div className="flex items-center space-x-4">
          <Link to="/"><img src={Logo} height={50} width={50} alt="logo" className="rounded-full hover:scale-110"/></Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className={location.pathname === '/' ? activeClass : navbarTextClass}>Home</Link>
            {isLoggedIn && (
              <>
                <Link to="/journal" className={location.pathname === '/journal' ? activeClass : navbarTextClass}>Create Journal</Link>
                <Link to="/viewjournal" className={location.pathname === '/viewjournal' ? activeClass : navbarTextClass}>View My Journals</Link>
              </>
            )}
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <div className="hidden md:flex space-x-4">
            {!isLoggedIn && <Link to="/register" className={location.pathname === '/register' ? activeClass : navbarTextClass}>Register</Link>}
            {isLoggedIn ? (
              <button onClick={handleLogout} className={navbarTextClass}>Logout</button>
            ) : (
              <Link to="/login" className={location.pathname === '/login' ? activeClass : navbarTextClass}>Login</Link>
            )}
            <ModeToggle />
          </div>
          <button onClick={toggleMenu} className="md:hidden text-2xl focus:outline-none">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link to="/" className={location.pathname === '/' ? activeClass : navbarTextClass} onClick={toggleMenu}>Home</Link>
          {isLoggedIn && (
            <>
              <Link to="/journal" className={location.pathname === '/journal' ? activeClass : navbarTextClass} onClick={toggleMenu}>Create Journal</Link>
              <Link to="/viewjournal" className={location.pathname === '/viewjournal' ? activeClass : navbarTextClass} onClick={toggleMenu}>View My Journals</Link>
            </>
          )}
          {!isLoggedIn && <Link to="/register" className={location.pathname === '/register' ? activeClass : navbarTextClass} onClick={toggleMenu}>Register</Link>}
          {isLoggedIn ? (
            <button onClick={() => { handleLogout(); toggleMenu(); }} className={navbarTextClass}>Logout</button>
          ) : (
            <Link to="/login" className={location.pathname === '/login' ? activeClass : navbarTextClass} onClick={toggleMenu}>Login</Link>
          )}
          <ModeToggle />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
