// src/Apis/CoursesApi.js
import api from "../axios"; // بدل axios العادي

const COURSES_URL = "/Course";

// ✅ Get all courses
export const getAllCourses = () => api.get(`${COURSES_URL}/GetAllCourses`);

// ✅ Get only visible courses
export const getVisibleCourses = () => api.get(`${COURSES_URL}/GetOnlyVisibleCourses`);

// ✅ Get course by Id
export const getCourseById = (id) => api.get(`${COURSES_URL}/GetCourseById/${id}`);

// ✅ Add new course
export const addCourse = (formData) =>
  api.post(`${COURSES_URL}/AddCourse`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ Update course
export const updateCourse = (id, formData) =>
  api.put(`${COURSES_URL}/UpdateCourse/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ Delete course
export const deleteCourse = (id) => api.delete(`${COURSES_URL}/${id}`);

// ✅ Hide course
export const hideCourse = (id) => api.put(`${COURSES_URL}/HideCourse/${id}`, {});

// ✅ Show (make visible) course
export const visibleCourse = (id) => api.put(`${COURSES_URL}/VisibleCourse/${id}`, {});
