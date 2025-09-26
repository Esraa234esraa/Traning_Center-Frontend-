// src/Apis/EvaluationAPI.js
import api from "../axios"; // بدل axios العادي

const EVAL_URL = "/Evaluation";

// ✅ Get all evaluations
export const getAllEvaluations = async () => {
  const res = await api.get(`${EVAL_URL}/GetAllEvaluation`);
  return res.data?.data || [];
};

// ✅ Add evaluation
export const addEvaluation = async (data) => {
  try {
    const response = await api.post(`${EVAL_URL}/AddEvaluation`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ✅ Delete evaluation
export const deleteEvaluation = (id) => api.delete(`${EVAL_URL}/${id}`);
