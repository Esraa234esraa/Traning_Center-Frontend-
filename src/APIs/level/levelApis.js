import axios from "axios";

const API_URL = "https://traning-center.runasp.net/api/Level";

// ✅ Add Level
export const addLevel = async (formData) => {
  const response = await axios.post(`${API_URL}/AddLevel`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// ✅ Get All Levels
export const getAllLevels = async () => {
  const response = await axios.get(`${API_URL}/GetAllLevels`);
  return response.data;
};

// ✅ Get All Levels of Course
export const getAllLevelsOfCourse = async (courseId) => {
  const response = await axios.get(`${API_URL}/GetAllLevelsOfCourse/${courseId}`);
  return response.data;
};

// ✅ Get Level by Id
export const getLevelById = async (id) => {
  const response = await axios.get(`${API_URL}/GetLevelById/${id}`);
  return response.data;
};

// ✅ Update Level
export const updateLevel = async ({ id, formData }) => {
  const response = await axios.put(`${API_URL}/UpdateLevel/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// ✅ Delete Level
export const deleteLevel = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
