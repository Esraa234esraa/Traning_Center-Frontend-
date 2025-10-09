import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNote, updateNote, deleteNote } from "../../APIs/Notes/NotesApi";

// ✅ Add Level
export const useAddNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["Notes"]);
    },
  });
};

// ✅ Update Level
export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["Notes"]);
    },
  });
};

// ✅ Delete Level
export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["Notes"]);
    },
  });
};
