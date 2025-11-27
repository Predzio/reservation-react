import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import AuthService from '../services/auth.service';
import { type User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>; 
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser as User); 
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await AuthService.login(email, password);
      const user = AuthService.getCurrentUser();
      setUser(user as User);
    } catch (error) {
      console.error("Error login", error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook, który ułatwia życie i sprawdza czy kontekst istnieje
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};