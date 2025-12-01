import React, { useState } from "react";
import { AuthContext } from "./Authcontext.tsx";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<"admin" | "user" | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (username: string, role: "admin" | "user", token: string) => {
    setUsername(username);
    setRole(role);
    setToken(token);

    // Save to localStorage if needed
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setUsername(null);
    setRole(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        role,
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
