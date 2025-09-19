import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAdmin, deactivateAdmin, adminLogout, changePassword, adminRegister, adminLogin } from '../../APIs/Admin/adminsApis';

export function useUpdateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries(['allAdmins']);
    }
  });
}

export function useDeactivateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries(['allAdmins']);
    }
  });
}

export function useAdminLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminLogout,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminProfile']);
      CookieStore.removeItem('userToken'); // لو فعلاً بتستخدم التخزين في localStorage
    }
  });
}

export function useChangePassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminProfile']);
    }
  });
}

export function useAdminLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminLogin,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminProfile']);
    }
  });
}

export function useAdminRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminRegister,
    onSuccess: () => {
      queryClient.invalidateQueries(['allAdmins']);
    }
  });
}
