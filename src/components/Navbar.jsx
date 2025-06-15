import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl">Healthcare Assistant</span>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink
              to="/resources"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-gray-800 font-bold text-white' : 'hover:bg-blue-500'
                }`
              }
            >
              Hospital Dashboard
            </NavLink>
            <NavLink
              to="/symptom-checker"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-gray-800 font-bold text-white' : 'hover:bg-blue-500'
                }`
              }
            >
              Symptom Checker
            </NavLink>
            <NavLink
              to="/medical-imaging"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-gray-800 font-bold text-white' : 'hover:bg-blue-500'
                }`
              }
            >
              Medical Imaging
            </NavLink>
            <NavLink
              to="/medication-checker"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-gray-800 font-bold text-white' : 'hover:bg-blue-500'
                }`
              }
            >
              Medication Checker
            </NavLink>
            <NavLink
              to="/mental-health-chatbox"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-gray-800 font-bold text-white' : 'hover:bg-blue-500'
                }`
              }
            >
              Mental Health Chatbox
            </NavLink>
            <button className="relative p-2 rounded-full hover:bg-blue-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;