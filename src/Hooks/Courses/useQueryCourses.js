
import { useQuery } from '@tanstack/react-query';
import { getAllCourses, getVisibleCourses, getCourseById } from '../../APIs/Courses/coursesApis';

export function useGetAllCourses() {
  return useQuery({
    queryKey: ['allCourses'],
    queryFn: async () => {
      const response = await getAllCourses();
      return response.data; // هترجع { success, message, data }
    },
  });
}

export function useGetVisibleCourses() {
  return useQuery({
    queryKey: ['visibleCourses'],
    queryFn: async () => {
      const response = await getVisibleCourses();
      return response.data; // هترجع { success, message, data }
    },
  });
}
export function useGetCourseById(id) {
  return useQuery(['course', id], () => getCourseById(id), {
    enabled: !!id, // يشغل الـ query فقط لو id موجود
    retry: 1,      // يعيد المحاولة مرة واحدة عند الفشل
    staleTime: 1000 * 60 * 5, // 5 دقائق كوقت صلاحية البيانات
  });
}
