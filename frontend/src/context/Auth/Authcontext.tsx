import { createContext, useContext } from "react";

interface AuthContextType {
  username: string | null;
  role: "admin" | "user" | null;
  
  token: string | null;
  isAuthenticated: boolean;

  login: (username: string, role: "admin" | "user", token: string) => void;
  logout: () => void;
}





export const AuthContext = createContext<AuthContextType>({
  username: null,
  role: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});


export const useAuth = () => useContext(AuthContext);
