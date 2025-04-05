import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Library, Settings, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@clerk/clerk-react';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { isSignedIn } = useAuth();
  const [expandedSections, setExpandedSections] = useState({
    newReleases: true,
    top: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navItems = [
    {
      path: '/',
      icon: <Home size={20} />,
      label: 'Home',
      aria: 'Navigate to home page'
    },
    {
      path: '/library',
      icon: <Library size={20} />,
      label: 'Library',
      aria: 'Navigate to your game library',
      protected: true
    },
    {
      path: '/reviews',
      icon: <Star size={20} />,
      label: 'Reviews',
      aria: 'View game reviews'
    }
  ];

  const renderNavItem = (item) => {
    const isActive = pathname === item.path;
    const baseClasses = "flex items-center gap-3 p-2 rounded-lg transition-all";
    const activeClasses = "bg-blue-50 text-blue-600";
    const inactiveClasses = "text-gray-700 hover:text-gray-900 hover:bg-gray-100";
    
    if (item.protected && !isSignedIn) return null;

    return (
      <Link
        to={item.path}
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        aria-label={item.aria}
        key={item.label}
      >
        {item.icon}
        <span className="font-medium">{item.label}</span>
        {isActive && (
          <motion.div
            layoutId="sidebar-active-indicator"
            className="absolute right-4 w-1.5 h-6 bg-blue-500 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    );
  };

  return (
    <div className="h-100 d-flex flex-column p-3 bg-light border-end">
      <div className="mb-2">
        <nav className="space-y-1">
          {navItems.map(renderNavItem)}
        </nav>
      </div>
      
      {isSignedIn && (
        <div className="mt-auto space-y-1 pt-4 border-t border-gray-200">
          <Link
            to="/settings"
            className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;