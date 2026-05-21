import React, { createContext, useContext, useState, useEffect } from 'react';

export type PlanType = 'starter' | 'builder' | 'full-arsenal';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: PlanType;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  signup: (name: string, email: string) => Promise<void>;
  logout: () => void;
  updatePlan: (plan: PlanType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('launchpilot_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('launchpilot_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('launchpilot_user');
    }
  }, [user]);

  const login = async (email: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For our mock UI, we'll create a user session dynamically
    const name = email.split('@')[0];
    const mockUser: User = {
      id: 'u_' + Math.random().toString(36).substr(2, 9),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email,
      plan: 'builder',
      createdAt: new Date().toISOString()
    };
    setUser(mockUser);
  };

  const signup = async (name: string, email: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockUser: User = {
      id: 'u_' + Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      plan: 'builder',
      createdAt: new Date().toISOString()
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updatePlan = (plan: PlanType) => {
    setUser(prev => prev ? { ...prev, plan } : null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      updatePlan
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
