import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LineChart, Briefcase, FlaskConical, Settings, Menu, X } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Strategies', path: '/strategies', icon: <FlaskConical size={20} /> },
    { name: 'Backtesting', path: '/backtesting', icon: <LineChart size={20} /> },
    { name: 'Portfolio', path: '/portfolio', icon: <Briefcase size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];
  
  return (
    <>
      <div 
        className={`md:block bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        } relative z-20 h-full shadow-sm`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
            {!collapsed && (
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">AlgoTrade</span>
            )}
            {collapsed && (
              <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center">
                <span className="font-bold">A</span>
              </div>
            )}
          </div>
          <button 
            onClick={toggleSidebar}
            className="md:flex hidden items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {collapsed ? <Menu size={18} className="text-gray-500 dark:text-gray-400" /> : <X size={18} className="text-gray-500 dark:text-gray-400" />}
          </button>
        </div>
        
        <div className="py-4">
          <nav className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md ${
                    isActive ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } transition-colors duration-200`
                }
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </div>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Mobile overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-10 ${collapsed ? 'hidden' : 'block'}`}
        onClick={toggleSidebar}
      ></div>
    </>
  );
};

export default Sidebar;