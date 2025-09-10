// src/Context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetAdminProfile } from "../Hooks/useQueryAdmin";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data, isLoading, error, refetch } = useGetAdminProfile();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // تحميل بيانات المستخدم عند فتح الصفحة
  useEffect(() => {
    if (!isLoading) {
      if (data?.data) {
        setUser(data.data);
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    }
  }, [data, isLoading]);

  // تسجيل الدخول (تحديث الـ state بعد نجاح الـ API)
  const login = (userData) => {
    setUser(userData);
  };

  // تسجيل الخروج
  const logout = () => {
    setUser(null);
    // ممكن تمسح الكوكي هنا لو API بيدعم
    // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loadingAuth, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
