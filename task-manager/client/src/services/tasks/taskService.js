import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Serviços para gerenciamento de tarefas
const taskService = {
  // Obter todas as tarefas do usuário
  getTasks: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Adicionar filtros à query string
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.priority) queryParams.append('priority', filters.priority);
      if (filters.project) queryParams.append('project', filters.project);
      if (filters.tag) queryParams.append('tag', filters.tag);
      
      const queryString = queryParams.toString();
      const url = `${API_URL}/tasks${queryString ? `?${queryString}` : ''}`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar tarefas' };
    }
  },
  
  // Obter uma tarefa específica
  getTask: async (taskId) => {
    try {
      const response = await axios.get(`${API_URL}/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao buscar tarefa' };
    }
  },
  
  // Criar uma nova tarefa
  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao criar tarefa' };
    }
  },
  
  // Atualizar uma tarefa existente
  updateTask: async (taskId, taskData) => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao atualizar tarefa' };
    }
  },
  
  // Excluir uma tarefa
  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao excluir tarefa' };
    }
  }
};

export default taskService;
