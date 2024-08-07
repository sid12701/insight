import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../assets/meditate-logo.png';
import { ModeToggle } from './mode-toggle';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  return (
    <nav className="bg-transparent text-[#5A5A5A] py-4 w-screen">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/"><img src={Logo} height={50} width={50} alt="logo" className="rounded-full hover:scale-110"/></Link>
          <Link to="/" className={location.pathname === '/' ? activeClass : navbarTextClass}>Home</Link>
          {isLoggedIn && (
            <>
              <Link to="/journal" className={location.pathname === '/journal' ? activeClass : navbarTextClass}>Create Journal</Link>
              <Link to="/viewjournal" className={location.pathname === '/viewjournal' ? activeClass : navbarTextClass}>View My Journals</Link>
            </>
          )}
        </div>
        <div className="flex space-x-4">
          {!isLoggedIn && <Link to="/register" className={location.pathname === '/register' ? activeClass : navbarTextClass}>Register</Link>}
          {isLoggedIn ? (
            <button onClick={handleLogout} className={navbarTextClass}>Logout</button>
          ) : (
            <Link to="/login" className={location.pathname === '/login' ? activeClass : navbarTextClass}>Login</Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;