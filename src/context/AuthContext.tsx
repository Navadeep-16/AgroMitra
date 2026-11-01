import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '../types/user';
import { storage, SEED_USERS } from '../services/storage';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  token: string | null;
  login: (emailOrPhone: string, role?: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => storage.getCurrentUser());
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('agromitra_jwt_token') || 'demo_jwt_token_agromitra_secure');

  const role: UserRole = user ? user.role : 'FARMER';
  const isAuthenticated = !!user;

  const login = (emailOrPhone: string, targetRole: UserRole = 'FARMER'): boolean => {
    // Find matching seed user or create dummy user
    const users = storage.getUsers();
    let found = users.find(u => 
      u.email.toLowerCase() === emailOrPhone.toLowerCase() || 
      u.phone.includes(emailOrPhone) || 
      u.role === targetRole
    );

    if (!found) {
      found = SEED_USERS.find(u => u.role === targetRole) || SEED_USERS[0];
    }

    setUser(found);
    storage.setCurrentUser(found);
    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ sub: found.id, role: found.role, exp: Date.now() + 86400000 }))}.mock_signature`;
    setToken(mockJwt);
    localStorage.setItem('agromitra_jwt_token', mockJwt);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('agromitra_jwt_token');
    localStorage.removeItem('agromitra_current_user');
  };

  const switchRole = (newRole: UserRole) => {
    const targetUser = SEED_USERS.find(u => u.role === newRole) || SEED_USERS[0];
    setUser(targetUser);
    storage.setCurrentUser(targetUser);
    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ sub: targetUser.id, role: newRole, exp: Date.now() + 86400000 }))}.mock_signature`;
    setToken(mockJwt);
    localStorage.setItem('agromitra_jwt_token', mockJwt);
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, token, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

