import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { BookOpen, LogOut, User, LayoutDashboard, Menu, X, ChevronDown, Home, Info, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/about', icon: Info, label: 'About' },
    { to: '/contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-sm">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          whileHover={{ scale: 1.05 }}
          className="bg-primary p-1.5 sm:p-2 rounded-lg text-white"
        >
          <BookOpen size={20} className="sm:w-6 sm:h-6" />
        </motion.div>
        <span className="font-display font-bold text-lg sm:text-xl tracking-tight">
          LuminaBooks
        </span>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="hover:text-primary transition-colors text-sm lg:text-base"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        <ThemeToggle />

        {user ? (
          <div className="relative" ref={dropdownRef}>
            {/* User Avatar Button */}
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2 bg-primary/5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-primary/10 hover:bg-primary/10 transition-all group"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/20 flex items-center justify-center">
                <User size={14} className="sm:w-4 sm:h-4 text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-semibold hidden xs:inline-block">
                {user.username?.split(' ')[0] || user.username}
              </span>
              <ChevronDown 
                size={14} 
                className={`text-muted transition-transform duration-200 ${
                  isUserDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* User Dropdown Menu */}
            <AnimatePresence>
              {isUserDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-primary/10 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-primary/10">
                    <p className="text-sm font-semibold">{user.username}</p>
                    <p className="text-xs text-muted mt-1">{user.email}</p>
                    <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
                      user.role === 'admin' 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-gray-200 dark:bg-gray-700 text-muted'
                    }`}>
                      {user.role || 'User'}
                    </span>
                  </div>
                  
                  <div className="py-1">
                    {/* Dashboard Link for Admin */}
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary/5 transition-colors"
                      >
                        <LayoutDashboard size={16} className="text-primary" />
                        <span>Dashboard</span>
                      </Link>
                    )}
                    
                    {/* Profile Link */}
                    <Link
                      to="/profile"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary/5 transition-colors"
                    >
                      <User size={16} />
                      <span>Profile Settings</span>
                    </Link>
                    
                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/login"
              className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold bg-primary text-white rounded-full hover:shadow-lg hover:bg-primary/90 transition-all"
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-yellow-50 dark:bg-gray-900 shadow-2xl z-50 md:hidden flex flex-col"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-5 border-b border-primary/10">
                <div className="flex items-center gap-2">
                  <BookOpen size={24} className="text-primary" />
                  <span className="font-display font-bold text-xl">Menu</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* User Info in Mobile Menu */}
              {user && (
                <div className="p-5 border-b border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{user.username}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Navigation Links */}
              <div className="flex-1 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-3.5 text-base hover:bg-primary/5 transition-colors"
                  >
                    <link.icon size={20} />
                    <span>{link.label}</span>
                  </Link>
                ))}
                
                {/* Mobile Dashboard Link for Admin */}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-3.5 text-base hover:bg-primary/5 transition-colors"
                  >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                  </Link>
                )}
                
                {/* Mobile Profile Link */}
                {user && (
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-3.5 text-base hover:bg-primary/5 transition-colors"
                  >
                    <User size={20} />
                    <span>Profile Settings</span>
                  </Link>
                )}
              </div>

              {/* Mobile Logout Button */}
              {user && (
                <div className="p-5 border-t border-primary/10">
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-500/10 text-red-600 rounded-xl font-semibold hover:bg-red-500/20 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;