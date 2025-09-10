import axios from 'axios';

const API_URL = 'http://traning-center.runasp.net/api/admins';

export const adminLogin = (data) => {
    console.log('Login payload:', data);

  return axios.post(`${API_URL}/login`, data,{ withCredentials: true });
};

export const adminRegister = (data) => {
  return axios.post(`${API_URL}/register`, data,{ withCredentials: true });
};

export const getAdminProfile = () => {
  return axios.get(`${API_URL}/me`,{ withCredentials: true });
};

export const getAllAdmins = () => {
  return axios.get(`${API_URL}`,{ withCredentials: true });
};

export const updateAdmin = ({ id, data }) => {
  return axios.put(`${API_URL}/${id}`, data, { withCredentials: true });
};

export const deactivateAdmin = (id) => {
  return axios.delete(`${API_URL}/${id}`,{ withCredentials: true });
};
export const fetchAdminById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, { withCredentials: true });
  return response.data;
};

export const changePassword = (id, data) => {
  return axios.put(`${API_URL}/change-password/${id}`, data,{ withCredentials: true });
};

export const adminLogout = () => {
  return axios.post(`${API_URL}/logout`,{ withCredentials: true });
};
