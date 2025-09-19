import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetAdminById } from '../../../Hooks/Admin/useQueryAdmin'; // fetch by id
import { useQueryClient } from '@tanstack/react-query';
import EditAdminForm from './EditAdminForm';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Components/Loading';

export default function EditAdminPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const onClose = () => {
    navigate('/dashboard/admins_table');
  };

  const adminFromState = location.state?.admin;
  const cachedAdmins = queryClient.getQueryData(['allAdmins']);
  const adminFromCache = cachedAdmins?.data?.find((a) => a.id === id);

  // ✅ Hook دايمًا في top-level
  const { data, isLoading, isError } = useGetAdminById(id);

  // ترتيب الشروط للعرض
  if (adminFromState) return <EditAdminForm admin={adminFromState} onClose={onClose} />;
  if (adminFromCache) return <EditAdminForm admin={adminFromCache} onClose={onClose} />;
  if (isLoading) return <Loading />;
  if (isError) return <div>حدث خطأ أثناء جلب بيانات الأدمن</div>;
  if (!data?.data) return <div>لا توجد بيانات لعرضها</div>;

  return <EditAdminForm admin={data.data} onClose={onClose} />;
}
