import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from 'next-themes';

const navItems=[
    { name: 'About', path: '/' },
  { name: 'Projects', path: '/projects' },
]


const Navigation=()=>{
    const [isOpen, setIsOpen] =useState(false);
    const [scrolled, setScrolled] = useState(false);
     const {theme,setTheme} = useTheme();// here we should use the {} not [] because useTheme returns an object not an array
     
     // Memoized event handlers
      const handleScroll = useCallback(()=>{
          setScrolled(window.scrollY > 50);
      }, []);
      const toggleTheme = useCallback(() => {
           setTheme(theme === 'dark' ? 'light' : 'dark');
            
         }, [theme,setTheme]); 

      const toggleMobileMenu = useCallback(() => {
            setIsOpen((prev) => !prev);
        }, []);

      const closeMobileMenu = useCallback(() => {
           setIsOpen(false);
        }, []);

        // Effect depends on the memoized handlers
        useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, [handleScroll]);

     return(
        <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-navy/95 backdrop-blur-md shadow-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink
              to="/"
              className="text-xl lg:text-2xl font-bold text-gradient font-mono"
            >
              MJR
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-neon-blue'
                        : 'text-light-slate hover:text-neon-blue'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="font-mono text-neon-blue mr-2">
                        0{index + 1}.
                      </span>
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-blue"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="ml-4 glass-effect hover-glow"
              >
                {theme === 'dark' ? (
                  <FiSun className="w-4 h-4" />
                ) : (
                  <FiMoon className="w-4 h-4" />
                )}
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu} // Use memoized handler
              className="text-light-slate"
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-navy/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="section-padding py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={closeMobileMenu} // Use memoized handler
                    className={({ isActive }) =>
                      `block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'text-neon-blue bg-neon-blue/10'
                          : 'text-light-slate hover:text-neon-blue hover:bg-white/5'
                      }`
                    }
                  >
                    <span className="font-mono text-neon-blue mr-3">
                      0{index + 1}.
                    </span>
                    {item.name}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Button
                  variant="outline"
                  onClick={toggleTheme} // Use memoized handler
                  className="w-full glass-effect"
                >
                  {theme === 'dark' ? (
                    <>
                      <FiSun className="w-4 h-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <FiMoon className="w-4 h-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
     );

}


// 4. Export the component (no memo needed as it's a top-level layout)
export default Navigation;