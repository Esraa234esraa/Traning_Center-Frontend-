import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addClass,
  updateClass,
  deleteClass,
} from "../../APIs/Classes/ClassesApis";

// ✅ Add new class
export const useAddClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addClass,
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]); // تحديث القائمة
    },
  });
};

// ✅ Update class
export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updatedClass }) => updateClass(id, updatedClass),
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
    },
  });
};

// ✅ Delete class
export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
    },
  });
};
