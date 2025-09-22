// src/Apis/CoursesApi.js
import axios from "axios";

const API_URL = "http://traning-center.runasp.net/api/Course";

// ✅ Get all courses
export const getAllCourses = () => {
  return axios.get(`${API_URL}/GetAllCourses`, { withCredentials: true });
};

// ✅ Get only visible courses
export const getVisibleCourses = () => {
  return axios.get(`${API_URL}/GetOnlyVisibleCourses`, { withCredentials: true });
};

// ✅ Get course by Id
export const getCourseById = (id) => {
  return axios.get(`${API_URL}/GetCourseById/${id}`, { withCredentials: true });
};

// ✅ Add new course
export const addCourse = (formData) => {
  return axios.post(`${API_URL}/AddCourse`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// ✅ Update course
export const updateCourse = (id, formData) => {
  return axios.put(`${API_URL}/UpdateCourse/${id}`, formData, {
  withCredentials: true,
  headers: { "Content-Type": "multipart/form-data" },
});
};

// ✅ Delete course
export const deleteCourse = (id) => {
  return axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};

// ✅ Hide course
export const hideCourse = (id) => {
  return axios.put(`${API_URL}/HideCourse/${id}`, {}, { withCredentials: true });
};

// ✅ Show (make visible) course
export const visibleCourse = (id) => {
  return axios.put(`${API_URL}/VisibleCourse/${id}`, {}, { withCredentials: true });
};
