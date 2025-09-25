import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // لما يفتح الموقع أول مرة يشيك لو فيه بيانات متخزنة وصالحة
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      const now = new Date().getTime();

      if (!parsed.expiresAt || new Date(parsed.expiresAt).getTime() > now) {
        setUser(parsed); // لسه التوكن شغال
      } else {
        localStorage.removeItem("user"); // انتهت الصلاحية
      }
    }
  }, []);

  // login → تخزين بيانات المستخدم
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // logout → مسح بيانات المستخدم
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
