// adminApi.js
import api from "./axios";  // بدل axios العادي

const ADMIN_URL = "/admins";

export const adminLogin = async (data) => {
  const response = await api.post(`${ADMIN_URL}/login`, data);
  return response.data;
};

export const adminRegister = (data) => {
  return api.post(`${ADMIN_URL}/register`, data);
};

export const getAdminProfile = () => {
  return api.get(`${ADMIN_URL}/me`);
};

export const getAllAdmins = () => {
  return api.get(`${ADMIN_URL}`);
};

export const updateAdmin = ({ id, data }) => {
  return api.put(`${ADMIN_URL}/${id}`, data);
};

export const deactivateAdmin = (id) => {
  return api.delete(`${ADMIN_URL}/${id}`);
};

export const fetchAdminById = async (id) => {
  const response = await api.get(`${ADMIN_URL}/${id}`);
  return response.data;
};

export const changePassword = (id, data) => {
  return api.put(`${ADMIN_URL}/change-password/${id}`, data);
};

export const adminLogout = () => {
  return api.post(`${ADMIN_URL}/logout`);
};
