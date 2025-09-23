import { useQuery } from "@tanstack/react-query";
import {
  getAllClasses,
  getClassById,
  getAllClassesOfBouquet,getAllClassesEmptyFromTeacher
} from "../../APIs/Classes/ClassesApis";

// ✅ Get all classes
export const useGetAllClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: getAllClasses,
  });
};

// ✅ Get class by ID
export const useGetClassById = (id) => {
  return useQuery({
    queryKey: ["class", id],
    queryFn: () => getClassById(id),
    enabled: !!id, // ما يشتغلش إلا لو فيه id
  });
};

// ✅ Get all classes of a bouquet
export const useGetAllClassesOfBouquet = (bouquetId) => {
  return useQuery({
    queryKey: ["bouquet-classes", bouquetId],
    queryFn: () => getAllClassesOfBouquet(bouquetId),
    enabled: !!bouquetId,
  });
};
export const useGetAllClassesEmptyFromTeacher = () => {
  return useQuery({
    queryKey: ["classesEmpty"],
    queryFn: getAllClassesEmptyFromTeacher,
    select: (res) => res.data, // مصفوفة الحصص الفارغة
  });
};