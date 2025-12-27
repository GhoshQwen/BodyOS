import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Utensils, Dumbbell, TrendingUp, User, Users } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/diet', icon: Utensils, label: '饮食' },
    { path: '/exercise', icon: Dumbbell, label: '运动' },
    { path: '/progress', icon: TrendingUp, label: '进度' },
    { path: '/social', icon: Users, label: '社交' },
    { path: '/profile', icon: User, label: '我的' },
  ];
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
