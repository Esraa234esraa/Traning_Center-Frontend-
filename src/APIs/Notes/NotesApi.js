// src/Apis/LevelAPI.js
import api from "../axios"; // بدل axios العادي

const NOTE_URL = "/Note";

// ✅ Add Note
export const addNote = (formData) =>
  api.post(`${NOTE_URL}/AddNotesAsync`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
});

// ✅ Get All Notes
export const getAllNotes = () => api.get(`${NOTE_URL}/GetAllNotesAsync`);


// ✅ Get Note by Id
export const getNoteById = (id) => api.get(`${NOTE_URL}/GetNotesByIdAsync/${id}`);

// ✅ Update Note
export const updateNote = ({ id, formData }) =>
  api.put(`${NOTE_URL}/UpdateNotesAsync/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },

});

// ✅ Delete Note
export const deleteNote = (id) => api.delete(`${NOTE_URL}/${id}`);
