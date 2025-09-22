// src/Hooks/Courses/useQueryCourses.js
import { useQuery } from "@tanstack/react-query";
import { getAllCourses, getVisibleCourses, getCourseById } from "../../APIs/Courses/coursesApis";

// ✅ Get all courses
export const useGetAllCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourses,
    select: (res) => res.data.data, // نرجع الداتا بس
  });
};

// ✅ Get visible courses
export const useGetVisibleCourses = () => {
  return useQuery({
    queryKey: ["visibleCourses"],
    queryFn: getVisibleCourses,
    select: (res) => res.data,
  });
};

// ✅ Get course by Id
export const useGetCourseById = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
    enabled: !!id, // ما يشتغلش غير لو فيه id
    select: (res) => res.data.data, // نرجع الداتا بس
  });
};
