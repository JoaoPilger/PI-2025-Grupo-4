import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar sessão ao carregar
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/session', {
        withCredentials: true
      });
      
      if (response.data.loggedIn) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Usuário não autenticado');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      // Após login bem-sucedido, verificar a sessão
      await checkSession();
    } catch (error) {
      console.error('Erro ao verificar sessão após login:', error);
    }
  };

  const logout = async () => {
    try {
      // Fazer logout no backend
      await axios.post('http://localhost:3000/auth/logout', {}, {
        withCredentials: true
      });
      
      // Limpar estado local
      setUser(null);
      setIsAuthenticated(false);
      
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, limpar estado local
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    checkSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
