// src/Services/ClassesApi.js
import api from "../axios"; // بدل axios العادي

const CLASSES_URL = "/Classes";

// ✅ Get all classes
export const getAllClasses = async () => {
  const res = await api.get(`${CLASSES_URL}/GetAllClasses`);
  return res.data;
};

// ✅ Get class by ID
export const getClassById = async (id) => {
  const res = await api.get(`${CLASSES_URL}/GetClassById/${id}`);
  return res.data;
};

// ✅ Get all classes of specific bouquet
export const getAllClassesOfBouquet = async (bouquetId) => {
  const res = await api.get(`${CLASSES_URL}/AllClassesOfBouquet`, {
    params: { BouquetId: bouquetId },
  });
  return res.data;
};

// ✅ Add new class
export const addClass = async (newClass) => {
  const res = await api.post(`${CLASSES_URL}/AddClass`, newClass);
  return res.data;
};

// ✅ Update class
export const updateClass = async (id, updatedClass) => {
  const res = await api.put(`${CLASSES_URL}/UpdateClass/${id}`, updatedClass, {
    headers: { "Content-Type": "application/json" }
  });
  return res.data;
};

// ✅ Delete class
export const deleteClass = async (id) => {
  const res = await api.delete(`${CLASSES_URL}/${id}`);
  return res.data;
};

// ✅ Get all classes without teacher
export const getAllClassesEmptyFromTeacher = async () => {
  const res = await api.get(`${CLASSES_URL}/GetAllClassesEmptyFromTeacher`);
  return res.data;
};
