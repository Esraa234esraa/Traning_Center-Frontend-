import api from "../../APIs/axios";

const EXTERNAL_COURSE_URL = "/ExternalCourse";

// ➕ إضافة دورة خارجية
export const addExternalCourse = (formData) => {
  return api.post(`${EXTERNAL_COURSE_URL}/AddExternalCourse`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 📋 جلب جميع الدورات
export const getAllExternalCourses = () => {
  return api.get(`${EXTERNAL_COURSE_URL}/GetAllExternalCourses`);
};

// 📋 جلب الدورات الظاهرة فقط
export const getOnlyVisibleExternalCourses = () => {
  return api.get(`${EXTERNAL_COURSE_URL}/GetOnlyVisibleExternalCoursesAsync`);
};

// 🔍 جلب دورة واحدة بالـ ID
export const getExternalCourseById = (id) => {
  return api.get(`${EXTERNAL_COURSE_URL}/GetExternalCourseById/${id}`);
};

// ✏️ تعديل دورة
export const updateExternalCourse = (id, formData) => {
  return api.put(`${EXTERNAL_COURSE_URL}/UpdateExternalCourse/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 🗑️ حذف دورة
export const deleteExternalCourse = (id) => {
  return api.delete(`${EXTERNAL_COURSE_URL}/${id}`);
};

// 👁️ إخفاء دورة
export const hideExternalCourse = (id) => {
  return api.put(`${EXTERNAL_COURSE_URL}/HideExternalCourseAsync/${id}`);
};

// 👁️‍🗨️ إظهار دورة
export const visibleExternalCourse = (id) => {
  return api.put(`${EXTERNAL_COURSE_URL}/VisibleExternalCourseAsync/${id}`);
};
