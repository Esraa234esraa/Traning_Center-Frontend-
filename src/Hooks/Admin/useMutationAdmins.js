import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAdmin, deactivateAdmin, adminLogout, changePassword, adminRegister, adminLogin } from '../../APIs/Admin/adminsApis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: adminLogout,
    onSuccess: (res) => {
      if (res?.data?.success) {
        queryClient.invalidateQueries(["adminProfile"]);
        localStorage.removeItem("userToken"); // هنا التغيير ✅

        toast.success("تم تسجيل الخروج بنجاح");
        navigate("/login", { replace: true });
      } else {
        toast.error(res?.data?.message || "فشل تسجيل الخروج");
      }
    },
    onError: () => {
      toast.error("فشل تسجيل الخروج، حاول مرة أخرى");
    },
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
