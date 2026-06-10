import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import {
  BookOpen, LogOut, User, LayoutDashboard, Menu, X,
  ChevronDown, Home, Info, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
    setIsUserDropdownOpen(false);
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

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 lg:px-8 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-primary to-primary/80 p-1.5 sm:p-2 rounded-xl text-white shadow-lg"
            >
              <BookOpen size={18} className="sm:w-5 sm:h-5" />
            </motion.div>
            <div>
              <span className="font-display font-bold text-base sm:text-xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                LuminaBooks
              </span>
              <p className="text-[10px] text-muted hidden sm:block">Read. Learn. Grow.</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.to)
                    ? 'text-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                  }`}
              >
                {isActive(link.to) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/10 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section - Auth Section */}
          <div className="flex items-center gap-1 sm:gap-3">
            <ThemeToggle />

            {/* LOGGED IN USER - Show User Menu */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <User size={14} className="sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold hidden sm:block">
                    {user.username?.split(' ')[0] || user.username}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-muted transition-transform duration-200 hidden sm:block ${isUserDropdownOpen ? 'rotate-180' : ''
                      }`}
                  />
                </motion.button>

                {/* User Dropdown Menu - Desktop */}
                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
                        <p className="text-xs text-muted mt-0.5">{user.email}</p>
                        <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {user.role === 'admin' ? 'Admin' : 'Member'}
                        </span>
                      </div>

                      <div className="py-1">
                        {/* Admin Dashboard - Only for admin */}
                        {user.role === 'admin' && (
                          <Link
                            to="/admin"
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary/10 transition-colors text-primary w-full"
                          >
                            <LayoutDashboard size={16} />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}

                        <div className="h-px bg-gray-200 dark:bg-gray-700 my-1" />

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full"
                        >
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Logged Out State - Mobile Friendly
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  to="/login"
                  className="hidden sm:block px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 sm:px-4 py-1.5 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-md whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 md:hidden flex flex-col"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-br from-primary to-primary/80 p-2 rounded-xl">
                    <BookOpen size={20} className="text-white" />
                  </div>
                  <span className="font-display font-bold text-lg">LuminaBooks</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* User Info - Only for logged in users */}
              {user && (
                <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{user.username}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                      <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {user.role === 'admin' ? 'Admin' : 'Member'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Navigation Links */}
              <div className="flex-1 py-2 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3.5 text-base transition-colors ${isActive(link.to)
                        ? 'bg-primary/10 text-primary font-medium border-r-2 border-primary'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    <link.icon size={20} />
                    <span>{link.label}</span>
                  </Link>
                ))}

                {/* Admin Dashboard - Only for admin (Mobile) */}
                {user && user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-5 py-3.5 text-base text-primary font-medium hover:bg-primary/10 transition-colors"
                  >
                    <LayoutDashboard size={20} />
                    <span>Admin Dashboard</span>
                  </Link>
                )}

                {/* Logged Out User Links - Mobile */}
                {!user && (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-5 py-3.5 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="w-5"><i className="fas fa-sign-in-alt"></i></span>
                      <span>Sign In</span>
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-5 py-3.5 text-base text-primary font-medium hover:bg-primary/10 transition-colors"
                    >
                      <span className="w-5"><i className="fas fa-user-plus"></i></span>
                      <span>Sign Up</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Logout Button - Only for logged in users (Mobile) */}
              {user && (
                <div className="p-5 border-t border-gray-200 dark:border-gray-800">
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-500/10 text-red-600 rounded-xl font-semibold hover:bg-red-500/20 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;