import React, { useState } from 'react';
import { useAuth } from '../../context/auth/AuthContext';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-dark text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Botão de menu para mobile */}
          <button 
            className="md:hidden mr-2 text-white focus:outline-none" 
            onClick={toggleSidebar}
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Task Manager</h1>
        </div>
        
        {user && (
          <div className="flex items-center">
            <span className="mr-4 hidden sm:inline">{user.name}</span>
            <button
              onClick={logout}
              className="bg-primary hover:bg-secondary text-white px-3 py-1 rounded transition-all"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
