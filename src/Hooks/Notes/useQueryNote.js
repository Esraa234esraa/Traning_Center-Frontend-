import { useQuery } from "@tanstack/react-query";
import { getAllNotes, getNoteById } from "../../APIs/Notes/NotesApi";

// ✅ Get All Levels
export const useGetAllNotes = () => {
  return useQuery({
    queryKey: ["Notes"],
    queryFn: getAllNotes,
  });
};



// ✅ Get Level by Id
export const useGetNoteById = (id) => {
  return useQuery({
    queryKey: ["Note", id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
  });
};
