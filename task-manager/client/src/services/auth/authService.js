import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Configurar o axios para incluir o token em todas as requisições
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Serviços de autenticação
export const authService = {
  // Registrar um novo usuário
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        setAuthToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao registrar usuário' };
    }
  },

  // Login de usuário
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        setAuthToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao fazer login' };
    }
  },

  // Logout de usuário
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
  },

  // Obter usuário atual
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Verificar se o usuário está autenticado
  isAuthenticated: () => {
    return localStorage.getItem('token') ? true : false;
  },

  // Obter perfil do usuário
  getProfile: async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao obter perfil' };
    }
  },

  // Atualizar perfil do usuário
  updateProfile: async (userData) => {
    try {
      const response = await axios.patch(`${API_URL}/auth/me`, userData);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erro ao atualizar perfil' };
    }
  }
};

// Inicializar token se existir no localStorage
const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

export default authService;
