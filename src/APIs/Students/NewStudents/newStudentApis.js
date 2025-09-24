import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + "/api/NewStudents";
export const getAllStudents = () => {

  return axios.get(`${API_URL}/GetAllNewStudent`, { withCredentials: true });
};

export const gettAllWaitingStudents = () => {

  return axios.get(`${API_URL}/GetAllWaitingNewStudent`, { withCredentials: true });
};

export const addNewStudent = (data) => {
  return axios.post(`${API_URL}/AddNewStudent`, data, { withCredentials: true });
};
export const updateStudent = async ({id, data }) => {
  const response = await axios.put(`${API_URL}/PutNewStudent/${id}`, data, {
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
  }
  );
  return response.data;
};

export const deleteStudent = async(id) => {
const response = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
}

export const moveNewStudentToWatingStudent = (id) => {
  return axios.put(`${API_URL}/MoveNewStudentToWaitingStudent/${id}`, {}, { withCredentials: true });
};

export const updateWaitingStudent = async ({id, data }) => {
  const response = await axios.put(`${API_URL}/PutNewStudent/${id}`, data, {
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },
  }
  );
  return response.data;
};

export const deleteWaitingStudent = async(id) => {
const response = await axios.delete(`${API_URL}/DeleteWaitingStudent/${id}`, {
    withCredentials: true,
  });
  return response.data;
}
