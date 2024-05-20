import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Settings, CircleCheck, Castle, ScrollText, CircleUser } from 'lucide-react';

const Layout = ({ children }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    const handleLogout = () => {
      console.log('Log out process started');
      toggleDropdown();
      // Add your logout logic here
    };
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          !event.target.closest('.user-icon')
        ) {
          setIsDropdownOpen(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

  return (
    <div className="flex">
      <aside className="sidebar w-64 bg-gray-100 min-h-screen">
        <span className="logo-container flex items-center px-4 py-2">
          <div className="icon mr-2"><img className="h-6 w-6" src="/images/zen.png" alt="Logo" /></div>
          <div className="logo-text text-xl font-bold px-1">tasky</div>
        </span>
        <nav className="navigation mt-8">
          <ul>
            <li><Link to="/" className="block px-4 py-2 hover:bg-gray-200"><Castle className="inline-block mr-2" size={24} /> Home</Link></li>
            <li><Link to="/tasks" className="block px-4 py-2 hover:bg-gray-200"><CircleCheck className="inline-block mr-2" size={24} /> Tasks</Link></li>
            <li><Link to="/notes" className="block px-4 py-2 hover:bg-gray-200"><ScrollText className="inline-block mr-2" size={24} /> Notes</Link></li>
          </ul>
        </nav>
        <div className="settings mt-auto px-4 py-2">
          <Link to="/settings" className="block hover:bg-gray-200"><Settings className="inline-block mr-2" size={24} /> Settings</Link>
        </div>
      </aside>
      <main className="content flex-1 p-6">
      <div className="flex justify-end mb-4">
          <div className="relative">
            <button
              className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={toggleDropdown}
            >
              <CircleUser className="h-6 w-6" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;