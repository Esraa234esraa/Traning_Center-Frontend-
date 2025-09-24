// EvaluationAPI.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/Evaluation";

export const getAllEvaluations = async () => {
  const res = await axios.get(`${API_URL}/GetAllEvaluation`, {
    withCredentials: true,
  });
  return res.data?.data || [];
};

export const addEvaluation = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/AddEvaluation`, data, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteEvaluation = (id) => {
  return axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};
