// src/context/UserContext.jsx
import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        withCredentials: true
      });
      
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (err) {
      console.log('User not logged in');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  const clearUser = () => {
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};