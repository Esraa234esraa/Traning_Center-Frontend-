// src/Services/PackedgesApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/Bouquet";

// ✅ Get All Bouquets
export const getAllBouquets = async () => {
  const res = await axios.get(`${API_URL}/GetAllBouquets`);
  return res.data;
};

// ✅ Get Bouquet By Id
export const getBouquetById = async (id) => {
  const res = await axios.get(`${API_URL}/GetBouquetById/${id}`);
  return res.data;
};

// ✅ Get All Bouquets of Level
export const getBouquetsOfLevel = async (levelId) => {
  const res = await axios.get(`${API_URL}/GetAllBouquetsOfLevel/${levelId}`);
  return res.data;
};

// ✅ Add Bouquet
export const addBouquet = async (formData) => {
  const res = await axios.post(`${API_URL}/AddBouquet`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ Update Bouquet
export const updateBouquet = async ({ id, formData }) => {
  const res = await axios.put(`${API_URL}/UpdateBouquet/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ Delete Bouquet
export const deleteBouquet = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
