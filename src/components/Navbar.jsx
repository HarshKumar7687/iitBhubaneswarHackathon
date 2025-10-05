import React, { useState, useEffect } from 'react';
import { Home, Sparkles, Zap, Settings, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  const navLinks = [
    { href: '/', icon: <Home className="w-5 h-5" />, text: 'Home' },
    { href: '/page1', icon: <Sparkles className="w-5 h-5" />, text: 'Page 1' },
    { href: '/page2', icon: <Zap className="w-5 h-5" />, text: 'Page 2' },
    { href: '/page3', icon: <Settings className="w-5 h-5" />, text: 'Page 3' }
  ];

  // Sync active link with current URL
  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-transparent backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Text Based */}
          <div className="logo flex items-center">
            <a 
              href="/" 
              className="group relative flex items-center space-x-3"
              onClick={() => handleLinkClick('/')}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative px-4 py-2 bg-black/20 backdrop-blur-md rounded-lg leading-none flex items-center space-x-2 border border-white/10">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 font-black text-2xl tracking-wider">
                    NEXUS
                  </span>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xs text-purple-200 font-semibold tracking-widest uppercase">
                  World
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Navigation Links */}
            <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-md rounded-2xl p-1 border border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`relative flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-500 group ${
                    activeLink === link.href
                      ? 'text-white bg-gradient-to-r from-purple-500/30 to-pink-500/30 shadow-lg'
                      : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className={`transition-all duration-500 ${
                    activeLink === link.href 
                      ? 'scale-110 text-yellow-300' 
                      : 'group-hover:scale-110 group-hover:text-yellow-200'
                  }`}>
                    {link.icon}
                  </span>
                  <span className="relative">
                    {link.text}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 transition-all duration-500 ${
                      activeLink === link.href ? 'w-full' : 'group-hover:w-full'
                    }`}></span>
                  </span>
                  
                  {/* Active Link Glow */}
                  {activeLink === link.href && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-sm -z-10"></div>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex flex-col items-center justify-center w-12 h-12 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-500 hover:bg-white/10"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-black/40 backdrop-blur-xl border-b border-white/10 transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`flex items-center space-x-4 px-4 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  activeLink === link.href
                    ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white shadow-lg'
                    : 'text-gray-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className={`transition-transform duration-300 ${
                  activeLink === link.href ? 'scale-110 text-yellow-300' : ''
                }`}>
                  {link.icon}
                </span>
                <span>{link.text}</span>
                {activeLink === link.href && (
                  <div className="ml-auto w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Background Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 to-transparent"></div>
    </nav>
  );
};

export default Navbar;