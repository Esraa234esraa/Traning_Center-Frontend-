import axios from "axios";

const BASE_URL = "http://traning-center.runasp.net/api/CurrentStudent";

export const getAllCurrentStudents = async () => {
  const response = await axios.get(`${BASE_URL}/GetAllCurrentStudent`);
  return response.data;
};

export const addCurrentStudent = async (formData) => {
  const response = await axios.post(`${BASE_URL}/AddCurrentStudent`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateCurrentStudent = async (id, formData) => {
  const response = await axios.put(`${BASE_URL}/UpdateCurrentStudent/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteCurrentStudent = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
