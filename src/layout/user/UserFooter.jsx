import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center px-6">
        {/* Copyright */}
        <p className="mt-4 md:mt-0 text-center md:text-left">
          &copy; {new Date().getFullYear()} EcomPlus. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
