import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/meditate-logo.png';
import { ModeToggle } from './mode-toggle';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';

const Navbar = () =>{
  const [isLoggedIn,  setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

    const navbarTextClass = `hover:scale-110 transition transform duration-200 ease-in-out px-3 py-2 rounded dark:text-white`;
    useEffect(() => {
      const token = Cookie.get('token');
      setIsLoggedIn(!!token);
  }, []);

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
            <Link to="/" className={navbarTextClass}>Home</Link>
            <Link to="/journal" className={navbarTextClass}>Create Journal</Link>
            <Link to="/viewjournal" className={navbarTextClass}>View My Journals</Link>
            {/* <Link to="/chat" className={navbarTextClass}>Chat</Link> */}
          </div>
          <div className="flex space-x-4">
            {/* <Link to="/register" className={navbarTextClass}>Register</Link>
            <Link to="/login" className={navbarTextClass}>Login</Link> */}
            {!isLoggedIn && <Link to="/register" className={navbarTextClass}>Register</Link>}
            {isLoggedIn ? (
              <button onClick={handleLogout} className={navbarTextClass}>Logout</button>
            ) : (
              <Link to="/login" className={navbarTextClass}>Login</Link>
            )}

            <ModeToggle />
          </div>
        </div>
      </nav>
    )
}

export default Navbar

