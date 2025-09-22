import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/Classes";

// ✅ Get all classes
export const getAllClasses = async () => {
  const res = await axios.get(`${API_URL}/GetAllClasses`);
  return res.data;
};

// ✅ Get class by ID
export const getClassById = async (id) => {
  const res = await axios.get(`${API_URL}/GetClassById/${id}`);
  return res.data;
};

// ✅ Get all classes of specific bouquet
export const getAllClassesOfBouquet = async (bouquetId) => {
  const res = await axios.get(`${API_URL}/AllClassesOfBouquet`, {
    params: { BouquetId: bouquetId },
  });
  return res.data;
};

// ✅ Add new class
export const addClass = async (newClass) => {
  const res = await axios.post(`${API_URL}/AddClass`, newClass);
  return res.data;
};

// ✅ Update class
export const updateClass = async (id, updatedClass) => {
  const res = await axios.put(`${API_URL}/UpdateClass/${id}`, updatedClass);
  return res.data;
};

// ✅ Delete class
export const deleteClass = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
