import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'traveler' | 'customer';
  avatar?: string;
  rating?: number;
  completedOrders: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: 'traveler' | 'customer') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role: email.includes('traveler') ? 'traveler' : 'customer',
      completedOrders: Math.floor(Math.random() * 50),
      rating: 4.5 + Math.random() * 0.5
    };

    setTimeout(() => {
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setIsLoading(false);
    }, 1000);

    return true;
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    role: 'traveler' | 'customer'
  ): Promise<boolean> => {
    setIsLoading(true);
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      completedOrders: 0,
      rating: 5.0
    };

    setTimeout(() => {
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setIsLoading(false);
    }, 1000);

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;