// src/Hooks/Courses/useMutationCourses.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCourse, updateCourse, deleteCourse, hideCourse, visibleCourse } from "../../APIs/Courses/coursesApis";

// ✅ Add Course
export const useAddCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

// ✅ Update Course
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => updateCourse(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

// ✅ Delete Course
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

// ✅ Hide Course
export const useHideCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: hideCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};

// ✅ Visible Course
export const useVisibleCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: visibleCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });
};
