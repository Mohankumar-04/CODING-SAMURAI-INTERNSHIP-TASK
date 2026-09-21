import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, ArrowLeftRight, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/books', label: 'Books', icon: BookOpen },
    { to: '/members', label: 'Members', icon: Users },
    { to: '/transactions', label: 'Circulation', icon: ArrowLeftRight },
  ];

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-7 w-7 text-indigo-400" />
            <span className="font-bold text-xl tracking-tight">LibraryPro</span>
          </div>
          <div className="flex space-x-2">
            {links.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;