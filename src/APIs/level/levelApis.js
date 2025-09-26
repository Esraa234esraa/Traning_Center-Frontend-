// src/Apis/LevelAPI.js
import api from "../axios"; // بدل axios العادي

const LEVEL_URL = "/Level";

// ✅ Add Level
export const addLevel = (formData) =>
  api.post(`${LEVEL_URL}/AddLevel`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ Get All Levels
export const getAllLevels = () => api.get(`${LEVEL_URL}/GetAllLevels`);

// ✅ Get All Levels of Course
export const getAllLevelsOfCourse = (courseId) =>
  api.get(`${LEVEL_URL}/GetAllLevelsOfCourse/${courseId}`);

// ✅ Get Level by Id
export const getLevelById = (id) => api.get(`${LEVEL_URL}/GetLevelById/${id}`);

// ✅ Update Level
export const updateLevel = ({ id, formData }) =>
  api.put(`${LEVEL_URL}/UpdateLevel/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ Delete Level
export const deleteLevel = (id) => api.delete(`${LEVEL_URL}/${id}`);
