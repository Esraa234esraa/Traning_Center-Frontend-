import { useQuery } from "@tanstack/react-query";
import {
  getAllExternalCourses,
  getExternalCourseById,
  getOnlyVisibleExternalCourses,
 

} from "../../APIs/ExternalCourses/ExternalCoursesApi";

// 📋 جلب جميع الدورات
export const useGetAllExternalCourses = () => {
  return useQuery({
    queryKey: ["allExternalCourses"],
    queryFn: getAllExternalCourses,
  });
};

// 📋 جلب الدورات الظاهرة فقط
export const useGetOnlyVisibleExternalCourses = () => {
  return useQuery({
    queryKey: ["visibleExternalCourses"],
    queryFn: getOnlyVisibleExternalCourses,
  });
};

// 🔍 جلب دورة بالـ ID
export const useGetExternalCourseById = (id) => {
  return useQuery({
    queryKey: ["externalCourse", id],
    queryFn: () => getExternalCourseById(id),
    enabled: !!id, // ✅ ينفذ فقط عند وجود ID
  });
};


