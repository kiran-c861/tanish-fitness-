import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_USERNAME = "Tanish";
const ADMIN_PASSWORD = "Tanish@123";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const savedAuth = localStorage.getItem("gym_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      setUsername(ADMIN_USERNAME);
    }
  }, []);

  const login = (inputUsername: string, inputPassword: string) => {
    if (inputUsername === ADMIN_USERNAME && inputPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setUsername(inputUsername);
      localStorage.setItem("gym_admin_auth", "true");
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem("gym_admin_auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
