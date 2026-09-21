import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-4">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Library Management System.
      </div>
    </footer>
  );
};

export default Footer;