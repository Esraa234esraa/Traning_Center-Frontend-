// src/Apis/TeacherApis.js
import api from "../axios";

const TEACHER_URL = "/Teacher";

// ✅ Add new teacher
export const addTeacher = async (teacherData) => {
  try {
    const response = await api.post(`${TEACHER_URL}/add`, teacherData);
    return response.data;
  } catch (error) {
    console.error("خطأ في إضافة المعلم:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Add class to teacher
export const addClassToTeacher = (teacherId, classId) => {
  return api.post(`${TEACHER_URL}/AddClassToTeacher`, { teacherId, classId });
};

// ✅ Update teacher
export const updateTeacher = (teacherId, data) => {
  return api.put(`${TEACHER_URL}/UpdateTeacher/${teacherId}`, data);
};

// ✅ Get teacher profile with classes
export const getTeacherProfileWithClasses = (teacherId) => {
  return api.get(`${TEACHER_URL}/GetProfileTeacherWithClasses/${teacherId}`);
};

// ✅ Get teacher by ID
export const getTeacherProfile = (teacherId) => {
  return api.get(`${TEACHER_URL}/GetTeacherById/${teacherId}`);
};

// ✅ Get all teachers
export const getAllTeachers = async () => {
  try {
    const response = await api.get(`${TEACHER_URL}/GetAllTeachers`);
    return response.data;
  } catch (error) {
    console.error("خطأ في جلب المعلمين:", error);
    throw error;
  }
};

// ✅ Delete teacher
export const deleteTeacher = async (teacherId) => {
  try {
    const response = await api.delete(`${TEACHER_URL}/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error("خطأ في حذف المعلم:", error);
    throw error;
  }
};
export const resetTeacherPassword = async (teacherId, password) => {
  try {
    const response = await api.put(
      `${TEACHER_URL}/ResetPassword/${teacherId}?password=${encodeURIComponent(password)}`
    );
    return response.data;
  } catch (error) {
    console.error("خطأ في تغيير باسورد المعلم:", error);
    throw error;
  }
};

