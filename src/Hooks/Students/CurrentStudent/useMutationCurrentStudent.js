import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addCurrentStudent,
  updateCurrentStudent,
  deleteCurrentStudent,
} from "../../../APIs/Students/CurrentStudent/CurrentStudentApis";

// إضافة طالب جديد
export const useAddCurrentStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCurrentStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentStudents"] });
    },
    onError: (error) => {
      console.error("حدث خطأ أثناء الإضافة:", error);
    },
  });
};

// تعديل طالب
export const useUpdateCurrentStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updateCurrentStudent(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentStudents"] });
    },
    onError: (error) => {
      console.error("حدث خطأ أثناء التعديل:", error);
    },
  });
};

// حذف طالب
export const useDeleteCurrentStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCurrentStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentStudents"] });
    },
    onError: (error) => {
      console.error("حدث خطأ أثناء الحذف:", error);
    },
  });
};
