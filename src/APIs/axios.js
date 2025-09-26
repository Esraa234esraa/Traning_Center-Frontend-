// axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🟢 Request Interceptor: يضيف الـ token لكل request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // خزناه بعد login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔴 Response Interceptor: لو في 401 → Logout أو Redirect
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // امسح البيانات من localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("teacherId");
      localStorage.removeItem("teacherName");

      // رجّع المستخدم للـ login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
