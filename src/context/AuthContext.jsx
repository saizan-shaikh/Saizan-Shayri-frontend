import React from 'react';
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const activeEmail = localStorage.getItem('activeEmail');
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    if (token && activeEmail) {
      const activeUser = registeredUsers.find(u => u.email === activeEmail);
      if (activeUser) {
        setUser(activeUser);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const existingUser = registeredUsers.find(u => u.email === email && u.password === password);

    if (existingUser) {
      localStorage.setItem('token', 'active-auth-session');
      localStorage.setItem('activeEmail', email);
      setUser(existingUser);
    } else {
      throw { response: { data: { message: 'Invalid credentials. Please try again.' } } };
    }
  };

  const register = async (username, email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const exists = registeredUsers.some(u => u.email === email);

    if (exists) {
      throw { response: { data: { message: 'Email already registered.' } } };
    }

    const newUser = { username, email, password };
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('activeEmail');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
