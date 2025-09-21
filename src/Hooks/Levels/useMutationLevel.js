import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLevel, updateLevel, deleteLevel } from "../../APIs/level/levelApis";

// ✅ Add Level
export const useAddLevel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addLevel,
    onSuccess: () => {
      queryClient.invalidateQueries(["levels"]);
    },
  });
};

// ✅ Update Level
export const useUpdateLevel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLevel,
    onSuccess: () => {
      queryClient.invalidateQueries(["levels"]);
    },
  });
};

// ✅ Delete Level
export const useDeleteLevel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLevel,
    onSuccess: () => {
      queryClient.invalidateQueries(["levels"]);
    },
  });
};
