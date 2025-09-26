// src/Services/PackedgesApi.js
import api from "../axios"; // بدل axios العادي

const BOUQUET_URL = "/Bouquet";

// ✅ Get All Bouquets
export const getAllBouquets = async () => {
  const res = await api.get(`${BOUQUET_URL}/GetAllBouquets`);
  return res.data;
};

// ✅ Get Bouquet By Id
export const getBouquetById = async (id) => {
  const res = await api.get(`${BOUQUET_URL}/GetBouquetById/${id}`);
  return res.data;
};

// ✅ Get All Bouquets of Level
export const getBouquetsOfLevel = async (levelId) => {
  const res = await api.get(`${BOUQUET_URL}/GetAllBouquetsOfLevel/${levelId}`);
  return res.data;
};

// ✅ Add Bouquet
export const addBouquet = async (formData) => {
  const res = await api.post(`${BOUQUET_URL}/AddBouquet`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ Update Bouquet
export const updateBouquet = async ({ id, formData }) => {
  const res = await api.put(`${BOUQUET_URL}/UpdateBouquet/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// ✅ Delete Bouquet
export const deleteBouquet = async (id) => {
  const res = await api.delete(`${BOUQUET_URL}/${id}`);
  return res.data;
};
