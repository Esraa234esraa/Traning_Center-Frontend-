// AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useGetAdminProfile } from "../Hooks/Admin/useQueryAdmin";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data, isLoading, refetch } = useGetAdminProfile();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setUser(data?.data || null);
      setLoadingAuth(false);
    }
  }, [data, isLoading]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loadingAuth, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
