import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth/AuthContext';
import taskService from '../../services/tasks/taskService';
import projectService from '../../services/projects/projectService';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    totalProjects: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Buscar tarefas
        const tasksResponse = await taskService.getTasks();
        const tasksData = tasksResponse.data.tasks;
        setTasks(tasksData);
        
        // Buscar projetos
        const projectsResponse = await projectService.getProjects();
        const projectsData = projectsResponse.data.projects;
        setProjects(projectsData);
        
        // Calcular estatísticas
        const completedTasks = tasksData.filter(task => task.status === 'completed').length;
        const pendingTasks = tasksData.filter(task => task.status === 'pending').length;
        const inProgressTasks = tasksData.filter(task => task.status === 'in_progress').length;
        
        setStats({
          totalTasks: tasksData.length,
          completedTasks,
          pendingTasks,
          inProgressTasks,
          totalProjects: projectsData.length
        });
        
      } catch (error) {
        setError('Erro ao carregar dados do dashboard');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

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
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Bem-vindo, {user?.name}!</h2>
        <p className="text-gray-600">
          Aqui está um resumo das suas tarefas e projetos.
        </p>
      </div>
      
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total de Tarefas</h3>
          <p className="text-2xl font-bold text-dark">{stats.totalTasks}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Tarefas Concluídas</h3>
          <p className="text-2xl font-bold text-success">{stats.completedTasks}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Tarefas Pendentes</h3>
          <p className="text-2xl font-bold text-warning">{stats.pendingTasks}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total de Projetos</h3>
          <p className="text-2xl font-bold text-primary">{stats.totalProjects}</p>
        </div>
      </div>
      
      {/* Tarefas Recentes */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Tarefas Recentes</h2>
        
        {tasks.length === 0 ? (
          <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
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
                    Projeto
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.slice(0, 5).map((task) => (
                  <tr key={task._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {task.status === 'completed' ? 'Concluída' : 
                         task.status === 'in_progress' ? 'Em Progresso' : 'Pendente'}
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
                      {task.project ? task.project.name : 'Sem projeto'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Projetos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Seus Projetos</h2>
        
        {projects.length === 0 ? (
          <p className="text-gray-500">Nenhum projeto encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 6).map((project) => (
              <div key={project._id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center mb-2">
                  <div 
                    className="w-4 h-4 rounded-full mr-2" 
                    style={{ backgroundColor: project.color || '#0077B6' }}
                  ></div>
                  <h3 className="text-lg font-medium">{project.name}</h3>
                </div>
                {project.description && (
                  <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
