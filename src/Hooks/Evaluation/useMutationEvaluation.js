import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEvaluation, deleteEvaluation } from "../../APIs/Evaluation/EvaluationAPI";

export const useAddEvaluation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addEvaluation, // دالة الـ API
    onSuccess: () => {
      queryClient.invalidateQueries(["evaluations"]); // تحديث القائمة بعد الإضافة
    },
  });
};

export const useDeleteEvaluation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEvaluation, // دالة الـ API
    onSuccess: () => {
      queryClient.invalidateQueries(["evaluations"]); // تحديث القائمة بعد الحذف
    },
  });
};
