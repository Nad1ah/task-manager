import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <aside className="w-64 bg-dark text-white h-screen fixed">
      <div className="p-4">
        <h1 className="text-xl font-bold">Task Manager</h1>
      </div>
      <nav className="mt-8">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block px-4 py-2 hover:bg-primary transition-colors">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="block px-4 py-2 hover:bg-primary transition-colors">
              Tarefas
            </Link>
          </li>
          <li>
            <Link to="/projects" className="block px-4 py-2 hover:bg-primary transition-colors">
              Projetos
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block px-4 py-2 hover:bg-primary transition-colors">
              Perfil
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
