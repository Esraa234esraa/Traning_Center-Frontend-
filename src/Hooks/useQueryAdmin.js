import { useQuery } from '@tanstack/react-query';
import { getAdminProfile, getAllAdmins,fetchAdminById } from '../APIs/adminsApis';

export function useGetAdminProfile() {
  return useQuery({
  queryKey: ['adminProfile'],
  queryFn: () => getAdminProfile(),

});
}
export function useGetAdminById(id) {
  return useQuery(['admin', id], () => fetchAdminById(id), {
    enabled: !!id, // يشغل الـ query فقط لو id موجود
    retry: 1,      // يعيد المحاولة مرة واحدة عند الفشل
    staleTime: 1000 * 60 * 5, // 5 دقائق كوقت صلاحية البيانات
  });
}
export function useGetAllAdmins() {
  return useQuery({
    queryKey: ['allAdmins'],
    queryFn: async () => {
      const response = await getAllAdmins();
      return response.data; // هترجع { success, message, data }
    },
  });
}
// استورد دوال fetchAdminProfile و fetchAllAdmins من adminApis.js
