import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  role: "admin" | "user" | null;
  setRole: (role: "admin" | "user" | null) => void;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole as "admin" | "user");
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<string | null> => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login falhou");
      }

      const data = await response.json();
      const { token, role } = data;

      if (token) {
        setIsAuthenticated(true);
        setRole(role);
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        return token;
      }
      return null;
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.clear();
    setIsAuthenticated(false);
    setRole(null);
  };

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
