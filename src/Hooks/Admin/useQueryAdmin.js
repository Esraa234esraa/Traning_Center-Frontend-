import { useQuery } from '@tanstack/react-query';
import { getAdminProfile, getAllAdmins,fetchAdminById } from '../../APIs/Admin/adminsApis';

export function useGetAdminProfile() {
  return useQuery({
    queryKey: ['adminProfile'],
    queryFn: getAdminProfile,
  });
}

export function useGetAdminById(id) {
  return useQuery({
    queryKey: ['admin', id],
    queryFn: () => fetchAdminById(id),
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 دقائق
  });
}

export function useGetAllAdmins() {
  return useQuery({
    queryKey: ['allAdmins'],
    queryFn: async () => {
      const response = await getAllAdmins();
      return response.data; // { success, message, data }
    },
  });
}