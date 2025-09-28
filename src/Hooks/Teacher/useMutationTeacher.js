// src/Hooks/Teacher/useMutationTeacher.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTeacher, resetTeacherPassword, addClassToTeacher, updateTeacher, deleteTeacher } from "../../APIs/Teacher/TeacherApis";

import { toast } from "react-toastify";
// ✅ Mutation add teacher
export const useAddTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTeacher,
    onSuccess: (res) => {
      toast.success(res.data?.message || "تمت العملية بنجاح");
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });

};

// ✅ Mutation add class to teacher
export const useAddClassToTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teacherId, classId }) => addClassToTeacher(teacherId, classId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacherProfile"] });
    },
  });
};

// ✅ Mutation update teacher
export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teacherId, data }) => updateTeacher(teacherId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["teacherProfile"] });
    },
  });
};

// ✅ Mutation delete teacher
export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teacherId) => deleteTeacher(teacherId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};
export const useResetTeacherPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teacherId, password }) =>
      resetTeacherPassword(teacherId, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({ queryKey: ["teacherProfile"] });
    },
  });
};


