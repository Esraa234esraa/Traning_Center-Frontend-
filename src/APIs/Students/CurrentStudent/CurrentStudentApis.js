// src/Apis/CurrentStudentAPI.js
import api from "../../axios"; // بدل axios العادي

const CURRENT_STUDENT_URL = "/CurrentStudent";

// ✅ Get All Current Students
export const getAllCurrentStudents = ({ searchWord = "", pageNumber = 1, pageSize = 10 }) => {
  return api.get(`${CURRENT_STUDENT_URL}/GetAllCurrentStudent`, {
    params: {
      SearchWord: searchWord,
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
  });
};

// ✅ Add Current Student
export const addCurrentStudent = (formData) =>
  api.post(`${CURRENT_STUDENT_URL}/AddCurrentStudent`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ Update Current Student
export const updateCurrentStudent = (id, formData) =>
  api.put(`${CURRENT_STUDENT_URL}/UpdateCurrentStudent/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ Delete Current Student
export const deleteCurrentStudent = (id) => api.delete(`${CURRENT_STUDENT_URL}/${id}`);
