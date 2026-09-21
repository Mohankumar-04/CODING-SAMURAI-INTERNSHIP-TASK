import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ArrowLeftRight } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">System Overview</h1>
        <p className="text-slate-500 text-sm">Welcome to your Library Management Console</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/books" className="block bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition">
          <div className="flex items-center space-x-3 text-indigo-600 mb-2">
            <BookOpen className="h-6 w-6" />
            <h2 className="font-semibold uppercase tracking-wider text-xs">Catalogue</h2>
          </div>
          <p className="text-2xl font-bold text-slate-800">Manage Books</p>
          <p className="text-slate-600 text-sm mt-1">Check stock, register new titles, and track available copies.</p>
        </Link>

        <Link to="/members" className="block bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition">
          <div className="flex items-center space-x-3 text-emerald-600 mb-2">
            <Users className="h-6 w-6" />
            <h2 className="font-semibold uppercase tracking-wider text-xs">Patrons</h2>
          </div>
          <p className="text-2xl font-bold text-slate-800">Members</p>
          <p className="text-slate-600 text-sm mt-1">Register members, view active memberships, and check accounts.</p>
        </Link>

        <Link to="/transactions" className="block bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition">
          <div className="flex items-center space-x-3 text-amber-600 mb-2">
            <ArrowLeftRight className="h-6 w-6" />
            <h2 className="font-semibold uppercase tracking-wider text-xs">Circulation</h2>
          </div>
          <p className="text-2xl font-bold text-slate-800">Borrow & Return</p>
          <p className="text-slate-600 text-sm mt-1">Issue books to members, process returns, and track overdue fines.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;