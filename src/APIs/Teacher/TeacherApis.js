// src/APIs/TeacherApis.js
import axios from "axios";

const API_URL = "http://traning-center.runasp.net/api/Teacher"; // غيّري للـ backend النهائي

// ✅ Add new teacher
export const addTeacher = async (teacherData) => {
  console.log("Adding teacher with data:", teacherData);
  
  try {
    const response = await axios.post(`${API_URL}/add`, teacherData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    
    return response.data;
  } catch (error) {
    console.error("خطأ في إضافة المعلم:", error.response?.data || error.message);
    throw error;
  }
};

// export const addTeacher = async (teacherData) => {
//   try {
//     // لو جالك teacherData فيه { teacher: { ... } } خد اللي جوه teacher
//     const payload = teacherData.teacher ? teacherData.teacher : teacherData;

//     console.log("📤 Sending TeacherData:", payload);

//     const response = await axios.post(`${API_URL}/add`, payload, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       console.error("❌ خطأ في إضافة المعلم:", error.response.data);
//     } else {
//       console.error("❌ خطأ:", error.message);
//     }
//     throw error;
//   }
// };

// ✅ Add class to teacher
export const addClassToTeacher = (teacherId, classId) => {
  return axios.post(`${API_URL}/AddClassToTeacher`, { teacherId, classId }, { withCredentials: true });
};
// ✅ Update teacher
export const updateTeacher = (teacherId, data) => {
  return axios.put(`${API_URL}/UpdateTeacher/${teacherId}`, data, { withCredentials: true });
};

// ✅ Get teacher profile with classes
export const getTeacherProfileWithClasses = (teacherId) => {
  return axios.get(`${API_URL}/GetProfileTeacherWithClasses/${teacherId}`, { withCredentials: true });
};
export const getTeacherProfile = (teacherId) => {
  return axios.get(`${API_URL}/GetTeacherById/${teacherId}`, { withCredentials: true });
}

// ✅ Get all teachers
export const getAllTeachers = async () => {
  try {
    const response = await axios.get(`${API_URL}/GetAllTeachers`);
    return response.data;
  } catch (error) {
    console.error("خطأ في جلب المعلمين:", error);
    throw error;
  }
};

// ✅ Delete teacher
export const deleteTeacher = async (teacherId) => {
  try {
    const response = await axios.delete(`${API_URL}/${teacherId}`);
    return response.data;
  } catch (error) {
    console.error("خطأ في حذف المعلم:", error);
    throw error;
  }
};
