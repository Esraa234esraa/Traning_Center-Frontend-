// src/Apis/NewStudentsAPI.js
import api from "../../axios";

const NEW_STUDENTS_URL = "/NewStudents";

// ✅ Get All Students
export const getAllStudents = () => api.get(`${NEW_STUDENTS_URL}/GetAllNewStudent`);

// ✅ Get All Waiting Students
export const getAllWaitingStudents = () => api.get(`${NEW_STUDENTS_URL}/GetAllWaitingNewStudent`);

// ✅ Add New Student
export const addNewStudent = (data) => api.post(`${NEW_STUDENTS_URL}/AddNewStudent`, data);

// ✅ Update Student
export const updateStudent = ({ id, data }) =>
  api.put(`${NEW_STUDENTS_URL}/PutNewStudent/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });

// ✅ Delete Student
export const deleteStudent = (id) => api.delete(`${NEW_STUDENTS_URL}/${id}`);

// ✅ Move New Student To Waiting Student
export const moveNewStudentToWaitingStudent = (id) =>
  api.put(`${NEW_STUDENTS_URL}/MoveNewStudentToWaitingStudent/${id}`, {});

// ✅ Update Waiting Student
export const updateWaitingStudent = ({ id, data }) =>
  api.put(`${NEW_STUDENTS_URL}/PutWaitingStudent/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });

// ✅ Delete Waiting Student
export const deleteWaitingStudent = (id) =>
  api.delete(`${NEW_STUDENTS_URL}/DeleteWaitingStudent/${id}`);
