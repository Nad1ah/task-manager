import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import projectService from '../../services/projects/projectService';
import taskService from '../../services/tasks/taskService';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewProject = id === 'new';
  
  const [project, setProject] = useState({
    name: '',
    description: '',
    color: '#0077B6'
  });
  
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(!isNewProject);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Se não for um novo projeto, buscar dados do projeto existente
        if (!isNewProject) {
          const projectResponse = await projectService.getProject(id);
          setProject(projectResponse.data.project);
          
          // Buscar tarefas do projeto
          const tasksResponse = await projectService.getProjectTasks(id);
          setTasks(tasksResponse.data.tasks);
        }
      } catch (error) {
        setError('Erro ao carregar dados do projeto');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, isNewProject]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);
    
    try {
      if (isNewProject) {
        await projectService.createProject(project);
      } else {
        await projectService.updateProject(id, project);
      }
      navigate('/projects');
    } catch (error) {
      setError(error.message || 'Erro ao salvar projeto');
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este projeto? Todas as tarefas associadas também serão excluídas.')) {
      try {
        await projectService.deleteProject(id);
        navigate('/projects');
      } catch (error) {
        setError(error.message || 'Erro ao excluir projeto');
      }
    }
  };
  
  const handleCreateTask = () => {
    navigate(`/tasks/new?project=${id}`);
  };
  
  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return 'Concluída';
      case 'in_progress': return 'Em Progresso';
      case 'pending': return 'Pendente';
      default: return status;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{isNewProject ? 'Novo Projeto' : project.name}</h1>
        {!isNewProject && (
          <button
            onClick={handleDelete}
            className="bg-danger hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Excluir Projeto
          </button>
        )}
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              Nome do Projeto
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={project.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={project.description}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="color">
              Cor
            </label>
            <div className="flex items-center">
              <input
                type="color"
                id="color"
                name="color"
                value={project.color}
                onChange={handleChange}
                className="h-10 w-10 border border-gray-300 rounded-md mr-2"
              />
              <input
                type="text"
                value={project.color}
                onChange={handleChange}
                name="color"
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {isSaving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
      
      {!isNewProject && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Tarefas do Projeto</h2>
            <button
              onClick={handleCreateTask}
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
            >
              Nova Tarefa
            </button>
          </div>
          
          {tasks.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-500">Nenhuma tarefa encontrada neste projeto.</p>
              <button
                onClick={handleCreateTask}
                className="mt-4 bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
              >
                Criar Primeira Tarefa
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prioridade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data de Vencimento
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr 
                      key={task._id} 
                      onClick={() => handleTaskClick(task._id)}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        {task.description && (
                          <div className="text-sm text-gray-500">{task.description.substring(0, 50)}...</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {getStatusLabel(task.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {task.priority === 'high' ? 'Alta' : 
                           task.priority === 'medium' ? 'Média' : 'Baixa'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Sem data'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
