import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService from '../../services/projects/projectService';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await projectService.getProjects();
        setProjects(response.data.projects);
      } catch (error) {
        setError('Erro ao carregar projetos');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleCreateProject = () => {
    navigate('/projects/new');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projetos</h1>
        <button
          onClick={handleCreateProject}
          className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
        >
          Novo Projeto
        </button>
      </div>
      
      {projects.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500">Nenhum projeto encontrado.</p>
          <button
            onClick={handleCreateProject}
            className="mt-4 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
          >
            Criar Primeiro Projeto
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => handleProjectClick(project._id)}
              className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: project.color || '#0077B6' }}
                ></div>
                <h2 className="text-xl font-semibold">{project.name}</h2>
              </div>
              
              {project.description && (
                <p className="text-gray-600 mb-4">{project.description}</p>
              )}
              
              <div className="text-sm text-gray-500">
                Criado em {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
