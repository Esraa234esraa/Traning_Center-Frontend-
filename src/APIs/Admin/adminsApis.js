// src/APIs/adminApi.js
import api from "../axios";

const ADMIN_URL = "/admins"; // كل الريكوستات هتبقى بالنسبة لـ baseURL

// تسجيل الدخول
export const adminLogin = async (data) => {
  const response = await api.post(`${ADMIN_URL}/login`, data);
  return response.data;
};

// تسجيل حساب جديد
export const adminRegister = (data) => {
  return api.post(`${ADMIN_URL}/register`, data);
};

// جلب بيانات الـ profile
export const getAdminProfile = () => {
  return api.get(`${ADMIN_URL}/me`);
};

// جلب كل الأدمنز
export const getAllAdmins = () => {
  return api.get(ADMIN_URL);
};

// تعديل بيانات أدمن
export const updateAdmin = ({ id, data }) => {
  return api.put(`${ADMIN_URL}/${id}`, data);
};

// تعطيل أدمن
export const deactivateAdmin = (id) => {
  return api.delete(`${ADMIN_URL}/${id}`);
};

// جلب أدمن بالـ id
export const fetchAdminById = async (id) => {
  const response = await api.get(`${ADMIN_URL}/${id}`);
  return response.data;
};

// تغيير كلمة المرور
export const changePassword = (id, data) => {
  return api.put(`${ADMIN_URL}/change-password/${id}`, data);
};

// تسجيل الخروج
export const adminLogout = () => {
  return api.post(`${ADMIN_URL}/logout`);
};
