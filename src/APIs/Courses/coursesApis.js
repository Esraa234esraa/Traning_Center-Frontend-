import axios from 'axios';

const API_URL = 'http://traning-center.runasp.net/api/Courses';

export const getAllCourses = () => {

  return axios.get(`${API_URL}`, { withCredentials: true });
};

export const getVisibleCourses = () => {
  return axios.get(`${API_URL}/visible`, { withCredentials: true });
};

export const getCourseById = ({ id }) => {
  return axios.get(`${API_URL}/${id}`, { withCredentials: true });
};


export const updateCourse = ({ id ,data}) => {
return axios.put(`${API_URL}/${id}`, data, {
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
};

export const deactivateCourse = (id) => {
  return axios.delete(`${API_URL}/${id}`, { withCredentials: true });
};


export const createCourse = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/addCourse`, data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

