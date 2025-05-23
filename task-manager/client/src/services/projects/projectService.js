import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Serviços para gerenciamento de projetos
const projectService = {
  // Obter todos os projetos do usuário
  getProjects: async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar projetos' };
    }
  },
  
  // Obter um projeto específico
  getProject: async (projectId) => {
    try {
      const response = await axios.get(`${API_URL}/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar projeto' };
    }
  },
  
  // Criar um novo projeto
  createProject: async (projectData) => {
    try {
      const response = await axios.post(`${API_URL}/projects`, projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao criar projeto' };
    }
  },
  
  // Atualizar um projeto existente
  updateProject: async (projectId, projectData) => {
    try {
      const response = await axios.patch(`${API_URL}/projects/${projectId}`, projectData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao atualizar projeto' };
    }
  },
  
  // Excluir um projeto
  deleteProject: async (projectId) => {
    try {
      const response = await axios.delete(`${API_URL}/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao excluir projeto' };
    }
  },
  
  // Obter tarefas de um projeto específico
  getProjectTasks: async (projectId) => {
    try {
      const response = await axios.get(`${API_URL}/projects/${projectId}/tasks`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar tarefas do projeto' };
    }
  }
};

export default projectService;
