import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = "admin" | "instrutor" | "condutor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ user: null, login: () => false, logout: () => {} });

const mockUsers: Record<UserRole, User> = {
  admin: { id: "1", name: "Carlos Mendes", email: "admin@sigabem.com", role: "admin", phone: "(11) 99999-0001" },
  instrutor: { id: "2", name: "Roberto Silva", email: "instrutor@sigabem.com", role: "instrutor", phone: "(11) 99999-0002" },
  condutor: { id: "3", name: "Ana Costa", email: "ana@email.com", role: "condutor", phone: "(11) 99999-0003" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("siga-user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (_email: string, _password: string, role: UserRole) => {
    const u = mockUsers[role];
    setUser(u);
    localStorage.setItem("siga-user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("siga-user");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
