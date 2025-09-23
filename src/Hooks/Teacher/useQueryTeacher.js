// src/Hooks/Teacher/useQueryTeacher.js
import { useQuery } from "@tanstack/react-query";
import { getAllTeachers,getTeacherProfile, getTeacherProfileWithClasses } from "../../APIs/Teacher/TeacherApis";

// ✅ Get all teachers
export const useGetAllTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: getAllTeachers,
    select: (res) => res.data,
  });
};

// ✅ Get teacher profile with classes
export const useGetTeacherProfile = (teacherId) => {
  return useQuery({
    queryKey: ["teacherProfileClasses", teacherId],
    queryFn: () => getTeacherProfileWithClasses(teacherId),
    enabled: !!teacherId,
    select: (res) => res.data.data,
  });
};

export const useGetTeacherById = (teacherId) => {
  return useQuery({
    queryKey: ["teacherProfile", teacherId],
    queryFn: () => getTeacherProfile(teacherId),
    enabled: !!teacherId,
    select: (res) => res.data.data,
  });
};