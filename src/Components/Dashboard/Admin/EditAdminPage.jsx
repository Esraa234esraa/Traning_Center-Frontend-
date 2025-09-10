import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useGetAdminById } from '../../../Hooks/useQueryAdmin'; // fetch by id
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
    navigate('/dashboard/admins_table');  // ترجع لصفحة الجدول
  };
  // بيانات الأدمن من الحالة (state)
  const adminFromState = location.state?.admin;

  // لو البيانات موجودة في state نستخدمها
  if (adminFromState) {
    return <EditAdminForm admin={adminFromState} onClose={onClose} />;
  }

  // لو مش موجودة في state، نحاول نجيبها من الكاش
  const cachedAdmins = queryClient.getQueryData(['allAdmins']);
  const adminFromCache = cachedAdmins?.data?.find((a) => a.id === id);

  if (adminFromCache) {
    return <EditAdminForm admin={adminFromCache} onClose={onClose} />;
  }

  // لو مش موجودة في الكاش، نعمل fetch من السيرفر
  const { data, isLoading, isError } = useGetAdminById(id);

  if (isLoading) return <Loading />;
  if (isError) return <div>حدث خطأ أثناء جلب بيانات الأدمن</div>;

  const adminData = data?.data;

  if (!adminData) return <div>لا توجد بيانات لعرضها</div>;

  return <EditAdminForm admin={adminData} onClose={onClose} />;
}

