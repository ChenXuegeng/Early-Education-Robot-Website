import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, Award, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { currentUser } = useApp();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: '社区首页', icon: Home },
    { path: '/create-post', label: '发布帖子', icon: PlusCircle },
    { path: '/points', label: '积分中心', icon: Award },
    { path: '/profile', label: '我的', icon: User },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              🤖
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              幼教启蒙机器人社区
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-1 sm:space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col sm:flex-row items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                    active
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  <Icon size={20} className="sm:mr-2" />
                  <span className="text-xs sm:text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* User Points Preview (Optional) */}
          <div className="hidden md:flex items-center bg-yellow-100 px-3 py-1 rounded-full text-yellow-700 text-sm font-medium">
            <Award size={16} className="mr-1" />
            {currentUser.points} 积分
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
