import { useQuery } from "@tanstack/react-query";
import { getAllNotes, getNoteById ,getAllStudentsForNote} from "../../APIs/Notes/NotesApi";

// ✅ Get All Levels
export const useGetAllNotes = () => {
  return useQuery({
    queryKey: ["Notes"],
    queryFn: getAllNotes,
  });
};

export const useGetAllStudentsForNote = (options = {}) => {
  return useQuery({
    queryKey: ["StudentsForNotes"],
    queryFn: getAllStudentsForNote,
    enabled: options.enabled ?? true, 
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
