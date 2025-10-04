// src/Hooks/Teacher/useQueryTeacher.js
import { useQuery } from "@tanstack/react-query";
import { getAllTeachers,getTeacherProfile, getTeacherProfileWithClasses,GetProfileTeacherWithClassesAsyncByAdmin,GetAllClassesForTeacher } from "../../APIs/Teacher/TeacherApis";
import { useAuth } from "../../Context/useAuth";

// ✅ Get all teachers
export const useGetAllTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: getAllTeachers,
    select: (res) => res.data,
  });
};

// ✅ Get teacher profile with classes
export const useGetTeacherProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["teacherProfileClasses", user?.id],
    queryFn: () => getTeacherProfileWithClasses(user.id),
    enabled: !!user?.id,
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
export const useGetProfileTeacherWithClassesAsyncByAdmin = (teacherId) => {
  return useQuery({
    queryKey: ["teacherProfile", teacherId],
    queryFn: () => GetProfileTeacherWithClassesAsyncByAdmin(teacherId),
    enabled: !!teacherId,
    select: (res) => res.data,
  });
};

export const useGetAllClassesForTeacher = (teacherId) => {
  return useQuery({
    queryKey: ["teacherProfile", teacherId],
    queryFn: () => GetAllClassesForTeacher(teacherId),
    enabled: !!teacherId,
    select: (res) => res.data,
  });
};